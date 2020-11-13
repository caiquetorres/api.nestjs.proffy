import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'

import { Roles } from 'src/decorators/roles/roles.decorator'
import { User } from 'src/decorators/user/user.decorator'

import { JwtAuthGuard } from 'src/guards/jwt/jwt.guard'
import { RolesAuthGuard } from 'src/guards/roles/roles.guard'

import { CreateUserPayload } from '../models/create-user.payload'
import { UserProxy } from '../models/user.proxy'

import { UserService } from '../services/user.service'

import { RequestUser } from 'src/utils/type.shared'

import { RoleTypes } from 'src/models/enums/roles.enum'

@Controller('users')
export class UserController {
    public constructor(private readonly userService: UserService) {}

    /**
     * Method that can create a new user in the database
     * @param createUserPayload stores the new user data
     */
    @Post()
    public async create(
        @Body() createUserPayload: CreateUserPayload
    ): Promise<UserProxy> {
        const entity = await this.userService.create(createUserPayload)
        return entity.toProxy()
    }

    /**
     * Method that can return the request user
     * @param requestUser stores the user basic data
     */
    @Roles(RoleTypes.USER)
    @UseGuards(RolesAuthGuard)
    @UseGuards(JwtAuthGuard)
    @Get('me')
    public async getMe(@User() requestUser: RequestUser): Promise<UserProxy> {
        const entity = await this.userService.get(requestUser.id, requestUser)
        return entity.toProxy()
    }
}
