import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { TimeEntity } from '../entities/time.entity'

import { CreateTimePayload } from '../models/create-time.payload'

import { UserService } from 'src/modules/user/services/user.service'

import { RequestUser } from 'src/utils/type.shared'

@Injectable()
export class TimeService extends TypeOrmCrudService<TimeEntity> {
    public constructor(
        @InjectRepository(TimeEntity)
        private readonly repository: Repository<TimeEntity>,
        private readonly userService: UserService
    ) {
        super(repository)
    }

    public async create(
        requestUser: RequestUser,
        userId: number,
        createTimePayload: CreateTimePayload
    ): Promise<TimeEntity> {
        const user = await this.userService.get(requestUser, userId)
        const entity = new TimeEntity({
            ...createTimePayload,
            user
        })
        return await entity.save()
    }
}
