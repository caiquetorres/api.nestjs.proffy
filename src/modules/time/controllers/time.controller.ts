import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common'

import { Roles } from 'src/decorators/roles/roles.decorator'
import { User } from 'src/decorators/user/user.decorator'

import { JwtAuthGuard } from 'src/guards/jwt/jwt.guard'
import { RolesAuthGuard } from 'src/guards/roles/roles.guard'

import { CreateTimePayload } from '../models/create-time.payload'
import { TimeProxy } from '../models/time.proxy'

import { TimeService } from '../services/time.service'

import { RequestUser } from 'src/utils/type.shared'

import { RoleTypes } from 'src/models/enums/roles.enum'

@Controller('users/:userId/times')
export class TimeController {
    public constructor(private readonly timeService: TimeService) {}

    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.USER, RoleTypes.ADMIN)
    @UseGuards(JwtAuthGuard)
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
}
