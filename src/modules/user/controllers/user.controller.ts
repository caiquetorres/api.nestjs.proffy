import { Controller, Get, UseGuards } from '@nestjs/common'

import { UserProxy } from '../models/user.proxy'

import { UserService } from '../services/user.service'

import { User } from 'src/decorators/user/user.decorator'
import { JwtAuthGuard } from 'src/guards/jwt.guard'
import { RolesAuthGuard } from 'src/guards/roles.guard'
import { RequestUser } from 'src/utils/type.shared'

@Controller('users')
export class UserController {
    public constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @Get('me')
    public async getMe(@User() requestUser: RequestUser): Promise<UserProxy> {
        const entity = await this.userService.get(requestUser.id, requestUser)
        return entity.toProxy()
    }
}
