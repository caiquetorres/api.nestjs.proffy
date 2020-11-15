import {
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { TimeEntity } from '../entities/time.entity'

import { CreateTimePayload } from '../models/create-time.payload'
import { UpdateTimePayload } from '../models/update-time.payload'

import { UserService } from 'src/modules/user/services/user.service'

import { RequestUser } from 'src/utils/type.shared'
import { hasPermission } from 'src/utils/validation'

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
    public async get(timeId: number): Promise<TimeEntity> {
        const entity = await TimeEntity.findOne({
            where: { id: timeId },
            relations: ['user']
        })

        if (!entity)
            throw new NotFoundException(
                `The entity identified by "${timeId}" was not found`
            )

        return entity
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
                'You have no permission to access those sources'
            )

        const exists = await TimeEntity.exists(timeId)
        if (!exists)
            throw new NotFoundException(
                `The entity identified by "${timeId}" was not found`
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
                'You have no permission to access those sources'
            )

        const exists = await TimeEntity.exists(timeId)
        if (!exists)
            throw new NotFoundException(
                `The entity identified by "${timeId}" was not found`
            )

        await TimeEntity.delete({ id: timeId })
    }
}
