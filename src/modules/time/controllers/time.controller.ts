import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import {
    Crud,
    CrudRequest,
    CrudRequestInterceptor,
    GetManyDefaultResponse,
    ParsedRequest
} from '@nestjsx/crud'

import { Roles } from 'src/decorators/roles/roles.decorator'
import { User } from 'src/decorators/user/user.decorator'

import { JwtAuthGuard } from 'src/guards/jwt/jwt.guard'
import { RolesAuthGuard } from 'src/guards/roles/roles.guard'

import { TimeEntity } from '../entities/time.entity'

import { CreateTimePayload } from '../models/create-time.payload'
import { TimeProxy } from '../models/time.proxy'
import { UpdateTimePayload } from '../models/update-time.payload'

import { TimeService } from '../services/time.service'

import { mapCrud } from 'src/utils/crud'
import { RequestUser } from 'src/utils/type.shared'

import { RoleTypes } from 'src/models/enums/roles.enum'

@Crud({
    model: {
        type: TimeEntity
    },
    params: {
        userId: {
            disabled: true
        }
    },
    query: {
        join: {
            user: {}
        }
    }
})
@Controller('users/:userId/times/')
export class TimeController {
    public constructor(private readonly timeService: TimeService) {}

    /**
     * Method that can add a time entity in the database
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     * @param createTimePayload stores the new time data
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.USER, RoleTypes.ADMIN)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CrudRequestInterceptor)
    @Post()
    public async create(
        @User() requestUser: RequestUser,
        @Param('userId') userId: number,
        @Body() createTimePayload: CreateTimePayload
    ): Promise<TimeProxy> {
        const entity = await this.timeService.create(
            requestUser,
            userId,
            createTimePayload
        )
        return entity.toProxy()
    }

    /**
     * Method that can return a specific time
     * @param timeId stores the time id
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CrudRequestInterceptor)
    @Get(':id')
    public async get(
        @Param('userId') userId: number,
        @Param('id') timeId: number
    ): Promise<TimeProxy> {
        const entity = await this.timeService.list(userId, timeId)
        return entity.toProxy()
    }

    /**
     * Method that can return time entities
     * @param crudRequest stores the crud request parsed
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CrudRequestInterceptor)
    @Get()
    public async getMany(
        @Param('userId') userId: number,
        @ParsedRequest() crudRequest: CrudRequest
    ): Promise<GetManyDefaultResponse<TimeProxy> | TimeProxy[]> {
        const getMany = await this.timeService.listMany(userId, crudRequest)
        return mapCrud(getMany)
    }

    /**
     * Method that can update the time entity data
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     * @param timeId stores the time id
     * @param updateTimePayload stores the new time data
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.USER, RoleTypes.ADMIN)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CrudRequestInterceptor)
    @Patch(':id')
    public async update(
        @User() requestUser: RequestUser,
        @Param('userId') userId: number,
        @Param('id') timeId: number,
        @Body() updateTimePayload: UpdateTimePayload
    ): Promise<void> {
        await this.timeService.update(
            requestUser,
            userId,
            timeId,
            updateTimePayload
        )
    }

    /**
     * Method that can remove a time entity from the database
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     * @param timeId store the time id
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.USER, RoleTypes.ADMIN)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CrudRequestInterceptor)
    @Delete(':id')
    public async delete(
        @User() requestUser: RequestUser,
        @Param('userId') userId: number,
        @Param('id') timeId: number
    ): Promise<void> {
        await this.timeService.delete(requestUser, userId, timeId)
    }

    /**
     * Method that deletes all the times entities from the database
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.USER, RoleTypes.ADMIN)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CrudRequestInterceptor)
    @Delete()
    public async clear(
        @User() requestUser: RequestUser,
        @Param('userId') userId: number
    ): Promise<void> {
        await this.timeService.clear(requestUser, userId)
    }
}
