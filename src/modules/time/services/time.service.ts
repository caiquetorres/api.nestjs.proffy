import {
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { TimeEntity } from '../entities/time.entity'
import { UserEntity } from 'src/modules/user/entities/user.entity'

import { CreateTimePayload } from '../models/create-time.payload'
import { TimeProxy } from '../models/time.proxy'
import { UpdateTimePayload } from '../models/update-time.payload'

import { UserService } from 'src/modules/user/services/user.service'

import { RequestUser } from 'src/utils/type.shared'
import { hasPermission } from 'src/utils/validation'

import { DefaultValidationMessages } from 'src/models/classes/default-validation-messages'

@Injectable()
export class TimeService extends TypeOrmCrudService<TimeEntity> {
    public constructor(
        @InjectRepository(TimeEntity)
        private readonly repository: Repository<TimeEntity>,
        private readonly userService: UserService
    ) {
        super(repository)
    }

    /**
     * Method that can add a time entity in the database
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     * @param createTimePayload stores the new time data
     */
    public async create(
        requestUser: RequestUser,
        userId: number,
        createTimePayload: CreateTimePayload
    ): Promise<TimeEntity> {
        if (!hasPermission(requestUser, userId))
            throw new UnauthorizedException(
                DefaultValidationMessages.unauthorized
            )
        const existsUser = await UserEntity.exists(userId)
        if (!existsUser)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFoundDefaultMessage(userId)
            )

        const user = await this.userService.get(userId)
        const entity = new TimeEntity({
            ...createTimePayload,
            user
        })
        return await entity.save()
    }

    /**
     * Method that can return a specific time
     * @param timeId stores the time id
     */
    public async list(userId: number, timeId: number): Promise<TimeEntity> {
        const existsUser = await UserEntity.exists(userId)
        if (!existsUser)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFoundDefaultMessage(userId)
            )

        const entity = await TimeEntity.findOne({
            where: { id: timeId },
            relations: ['user']
        })

        if (!entity)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFoundDefaultMessage(timeId)
            )

        return entity
    }

    /**
     * Method that can return all the times of some user
     * @param userId stores the user id
     * @param crudRequest stores the logic that will be used toe find the
     * entities
     */
    public async listMany(
        userId: number,
        crudRequest: CrudRequest
    ): Promise<GetManyDefaultResponse<TimeProxy> | TimeProxy[]> {
        const existsUser = await UserEntity.exists(userId)
        if (!existsUser)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFoundDefaultMessage(userId)
            )

        const originalSearchParams = [...crudRequest.parsed.search.$and]
        crudRequest.parsed.join.push({
            field: 'user'
        })
        crudRequest.parsed.search = {
            $and: [{ 'user.id': userId }, ...originalSearchParams]
        }
        return await this.getMany(crudRequest)
    }

    /**
     * Method that can update the time entity data
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     * @param timeId stores the time id
     * @param updateTimePayload stores the new time data
     */
    public async update(
        requestUser: RequestUser,
        userId: number,
        timeId: number,
        updateTimePayload: UpdateTimePayload
    ): Promise<void> {
        if (!hasPermission(requestUser, userId))
            throw new UnauthorizedException(
                DefaultValidationMessages.unauthorized
            )

        const existsUser = await UserEntity.exists(userId)
        if (!existsUser)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFoundDefaultMessage(userId)
            )

        const existsTime = await TimeEntity.exists(timeId)
        if (!existsTime)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFoundDefaultMessage(timeId)
            )

        await TimeEntity.update({ id: timeId }, updateTimePayload)
    }

    /**
     * Method that can remove a time entity from the database
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     * @param timeId store the time id
     */
    public async delete(
        requestUser: RequestUser,
        userId: number,
        timeId: number
    ): Promise<void> {
        if (!hasPermission(requestUser, userId))
            throw new UnauthorizedException(
                DefaultValidationMessages.unauthorized
            )

        const existsUser = await UserEntity.exists(userId)
        if (!existsUser)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFoundDefaultMessage(userId)
            )

        const existsTime = await TimeEntity.exists(timeId)
        if (!existsTime)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFoundDefaultMessage(timeId)
            )

        await TimeEntity.delete({ id: timeId })
    }
}
