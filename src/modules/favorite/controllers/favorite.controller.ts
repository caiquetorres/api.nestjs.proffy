import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards
} from '@nestjs/common'

import { Roles } from 'src/decorators/roles/roles.decorator'
import { User } from 'src/decorators/user/user.decorator'

import { JwtAuthGuard } from 'src/guards/jwt/jwt.guard'
import { RolesAuthGuard } from 'src/guards/roles/roles.guard'

import { CreateFavoritePayload } from '../models/create-favorite.payload'
import { FavoriteProxy } from '../models/favorite.proxy'

import { FavoriteService } from '../services/favorite.service'

import { RequestUser } from 'src/utils/type.shared'

import { RoleTypes } from 'src/models/enums/roles.enum'

@Controller('users/:userId/favorites')
export class FavoriteController {
    public constructor(private readonly favoriteService: FavoriteService) {}

    /**
     * Method that can add a favorite entity in the database
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     * @param createFavoritePayload stores the new favorite entity data
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.ADMIN, RoleTypes.USER)
    @UseGuards(JwtAuthGuard)
    @Post()
    public async create(
        @User() requestUser: RequestUser,
        @Param('userId') userId: number,
        @Body() createFavoritePayload: CreateFavoritePayload
    ): Promise<FavoriteProxy> {
        const entity = await this.favoriteService.create(
            requestUser,
            userId,
            createFavoritePayload
        )
        return entity.toProxy()
    }

    /**
     * Method that can return a favorite entity
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     * @param favoriteId stores the favorite user id
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.ADMIN, RoleTypes.USER)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async get(
        @User() requestUser: RequestUser,
        @Param('userId') userId: number,
        @Param('id') favoriteId: number
    ): Promise<FavoriteProxy> {
        const entity = await this.favoriteService.get(
            requestUser,
            userId,
            favoriteId
        )
        return entity.toProxy()
    }

    /**
     * Method that remove a favorite entity from the database
     * @param requestUser stores the user basic data
     * @param userId stores the user id
     * @param favoriteId stores the favorite user id
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.ADMIN, RoleTypes.USER)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    public async delete(
        @User() requestUser: RequestUser,
        @Param('userId') userId: number,
        @Param('id') favoriteId: number
    ): Promise<void> {
        await this.favoriteService.delete(requestUser, userId, favoriteId)
    }
}
