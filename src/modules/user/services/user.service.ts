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

import { SubjectService } from 'src/modules/subject/services/subject.service'

import { encryptPassword } from 'src/utils/password'
import { RequestUser } from 'src/utils/type.shared'
import { hasPermission } from 'src/utils/validation'

import { DefaultValidationMessages } from 'src/models/classes/default-validation-messages'
import { RoleTypes } from 'src/models/enums/roles.enum'

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
    public constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
        private readonly subjectService: SubjectService
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
                DefaultValidationMessages.entityNotFoundDefaultMessage(
                    createUserPayload.email
                )
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
    public async get(userId: number): Promise<UserEntity> {
        const entity = await UserEntity.findOne({
            where: { id: userId },
            relations: ['subject']
        })

        if (!entity)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFoundDefaultMessage(userId)
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
                DefaultValidationMessages.unauthorized
            )
        const existsUser = await UserEntity.exists(userId)
        if (!existsUser)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFoundDefaultMessage(userId)
            )
        const { subjectId, ...rest } = updateUserPayload

        if (subjectId === undefined) {
            await UserEntity.update({ id: userId }, { ...rest })
            return
        }

        const subject = await this.subjectService.list(subjectId)
        await UserEntity.update({ id: userId }, { ...rest, subject })
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
                DefaultValidationMessages.unauthorized
            )

        const exists = await UserEntity.exists(userId)
        if (!exists)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFoundDefaultMessage(userId)
            )

        await UserEntity.delete({ id: userId })
    }
}
