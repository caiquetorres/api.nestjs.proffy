import {
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
import { RequestUser } from 'src/utils/type.shared'

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
    public constructor(
        @InjectRepository(UserEntity)
        public repository: Repository<UserEntity>
    ) {
        super(repository)
    }

    public async create(
        requestUser: RequestUser,
        createUserPayload: CreateUserPayload
    ): Promise<UserEntity> {
        const entity = new UserEntity(createUserPayload)

        return await entity.save()
    }

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
