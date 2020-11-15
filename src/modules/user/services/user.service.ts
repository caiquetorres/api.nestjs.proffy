import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from '../entities/user.entity'

import { CreateUserPayload } from '../models/create-user.payload'
import { UpdateUserPayload } from '../models/update-user.payload'

import { hasPermission } from 'src/utils/functions'
import { encryptPassword } from 'src/utils/password'
import { RequestUser } from 'src/utils/type.shared'

import { RoleTypes } from 'src/models/enums/roles.enum'

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
    public constructor(
        @InjectRepository(UserEntity)
        public repository: Repository<UserEntity>
    ) {
        super(repository)
    }

    /**
     * Method that can create a new user in the database
     * @param createUserPayload stores the new user data
     */
    public async create(
        createUserPayload: CreateUserPayload
    ): Promise<UserEntity> {
        const { password, roles, ...rest } = createUserPayload

        const hasUserWithEmail = await UserEntity.hasUserWithEmail(
            createUserPayload.email
        )
        if (hasUserWithEmail)
            throw new ConflictException(
                `The entity identified by "${createUserPayload.email}" already exists`
            )

        const encryptedPassword = await encryptPassword(password)

        const entity = new UserEntity({
            password: encryptedPassword,
            roles: roles ?? RoleTypes.USER,
            ...rest
        })
        return await entity.save()
    }

    /**
     * Method that can return only one user entity from the database
     * @param userId stores the user id
     * @param requestUser stores the user basic data
     */
    public async get(
        requestUser: RequestUser,
        userId: number
    ): Promise<UserEntity> {
        if (!hasPermission(requestUser, userId))
            throw new UnauthorizedException(
                'You have no permission to access those sources'
            )

        const entity = await UserEntity.findOne({ id: userId })

        if (!entity)
            throw new NotFoundException(
                `The entity identified by "${userId}" was not found`
            )

        return entity
    }

    /**
     * Method that can update the user data based on the payload
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     * @param updateUserPayload stores the user new data
     */
    public async update(
        requestUser: RequestUser,
        userId: number,
        updateUserPayload: UpdateUserPayload
    ): Promise<void> {
        if (!hasPermission(requestUser, userId))
            throw new UnauthorizedException(
                'You have no permission to access those sources'
            )

        const exists = await UserEntity.exists(userId)
        if (!exists)
            throw new NotFoundException(
                `The entity identified by "${userId}" was not found`
            )

        await UserEntity.update({ id: userId }, updateUserPayload)
    }

    /**
     * Method that can remove some entity of the database
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     */
    public async delete(
        requestUser: RequestUser,
        userId: number
    ): Promise<void> {
        if (!hasPermission(requestUser, userId))
            throw new UnauthorizedException(
                'You have no permission to access those sources'
            )

        const exists = await UserEntity.exists(userId)
        if (!exists)
            throw new NotFoundException(
                `The entity identified by "${userId}" was not found`
            )

        await UserEntity.delete({ id: userId })
    }
}
