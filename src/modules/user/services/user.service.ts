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
     * @param entityId stores the user id
     * @param requestUser stores the user basic data
     */
    public async get(
        entityId: number,
        requestUser: RequestUser
    ): Promise<UserEntity> {
        const entity = UserEntity.findOne(entityId)

        if (!hasPermission(entityId, requestUser))
            throw new UnauthorizedException(
                'You have no permission to access those sources'
            )

        if (!entity)
            throw new NotFoundException(
                `The entity identified by "${entityId}" was not found`
            )

        return entity
    }
}
