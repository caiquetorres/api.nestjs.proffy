import {
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { FavoriteEntity } from '../entities/favorite.entity'

import { CreateFavoritePayload } from '../models/create-favorite.payload'
import { FavoriteProxy } from '../models/favorite.proxy'

import { UserService } from 'src/modules/user/services/user.service'

import { RequestUser } from 'src/utils/type.shared'
import { hasPermission } from 'src/utils/validation'

import { DefaultValidationMessages } from 'src/models/classes/default-validation-messages'

@Injectable()
export class FavoriteService extends TypeOrmCrudService<FavoriteEntity> {
    public constructor(
        @InjectRepository(FavoriteEntity)
        private readonly repository: Repository<FavoriteEntity>,
        private readonly userService: UserService
    ) {
        super(repository)
    }

    /**
     * Method that can add a favorite entity in the database
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     * @param createFavoritePayload stores the new favorite entity data
     */
    public async create(
        requestUser: RequestUser,
        userId: number,
        createFavoritePayload: CreateFavoritePayload
    ): Promise<FavoriteEntity> {
        if (!hasPermission(requestUser, userId))
            throw new UnauthorizedException(
                DefaultValidationMessages.unauthorized
            )

        const user = await this.userService.get(userId)
        const favoriteUser = await this.userService.get(
            createFavoritePayload.favoriteUserId
        )

        const entity = new FavoriteEntity({
            user,
            favoriteUser
        })

        return await entity.save()
    }

    /**
     * Method that can return a favorite entity
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     * @param favoriteId stores the favorite user id
     */
    public async get(
        requestUser: RequestUser,
        userId: number,
        favoriteId: number
    ): Promise<FavoriteEntity> {
        if (!hasPermission(requestUser, userId))
            throw new UnauthorizedException(
                DefaultValidationMessages.unauthorized
            )

        const entity = await FavoriteEntity.findOne({
            where: { id: favoriteId },
            relations: ['user', 'favoriteUser']
        })

        if (!entity)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFoundDefaultMessage(
                    favoriteId
                )
            )

        return entity
    }

    /**
     * Method that can return favorite entities
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     * @param crudRequest stores the crud request parsed
     */
    public async listMany(
        requestUser: RequestUser,
        userId: number,
        crudRequest: CrudRequest
    ): Promise<GetManyDefaultResponse<FavoriteProxy> | FavoriteProxy[]> {
        if (!hasPermission(requestUser, userId))
            throw new UnauthorizedException(
                DefaultValidationMessages.unauthorized
            )

        const originalSearchParams = [...crudRequest.parsed.search.$and]
        crudRequest.parsed.search = {
            $and: [{ 'user.id': userId }, ...originalSearchParams]
        }

        return await this.getMany(crudRequest)
    }

    /**
     * Method that remove a favorite entity from the database
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     * @param favoriteId stores the favorite user id
     */
    public async delete(
        requestUser: RequestUser,
        userId: number,
        favoriteId: number
    ): Promise<void> {
        if (!hasPermission(requestUser, userId))
            throw new UnauthorizedException(
                DefaultValidationMessages.unauthorized
            )

        const exists = await FavoriteEntity.exists(favoriteId)
        if (!exists)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFoundDefaultMessage(
                    favoriteId
                )
            )

        await FavoriteEntity.delete({ id: favoriteId })
    }
}
