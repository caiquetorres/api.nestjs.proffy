import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards
} from '@nestjs/common'

import { Roles } from 'src/decorators/roles/roles.decorator'
import { User } from 'src/decorators/user/user.decorator'

import { JwtAuthGuard } from 'src/guards/jwt/jwt.guard'
import { RolesAuthGuard } from 'src/guards/roles/roles.guard'

import { CreateUserPayload } from '../models/create-user.payload'
import { UpdateUserPayload } from '../models/update-user.payload'
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
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.USER, RoleTypes.ADMIN)
    @UseGuards(JwtAuthGuard)
    @Get('me')
    public async getMe(@User() requestUser: RequestUser): Promise<UserProxy> {
        const entity = await this.userService.get(requestUser.id)
        return entity.toProxy()
    }

    /**
     * Method that can return an entity based on it id
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     */
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async get(
        @User() requestUser: RequestUser,
        @Param('id') userId: number
    ): Promise<UserProxy> {
        const entity = await this.userService.get(userId)
        return entity.toProxy()
    }

    /**
     * Method that can update the user data based on the payload
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     * @param updateUserPayload stores the user new data
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.USER, RoleTypes.ADMIN)
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    public async update(
        @User() requestUser: RequestUser,
        @Param('id') userId: number,
        @Body() updateUserPayload: UpdateUserPayload
    ): Promise<void> {
        await this.userService.update(requestUser, userId, updateUserPayload)
    }

    /**
     * Method that can remove some entity of the database
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.ADMIN)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    public async delete(
        @User() requestUser: RequestUser,
        @Param('id') userId: number
    ): Promise<void> {
        await this.userService.delete(requestUser, userId)
    }
}
