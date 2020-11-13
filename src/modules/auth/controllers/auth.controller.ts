import { Controller, Post, UseGuards } from '@nestjs/common'

import { User } from 'src/decorators/user/user.decorator'

import { LocalAuthGuard } from 'src/guards/local/local.guard'

import { TokenProxy } from '../models/token.proxy'

import { AuthService } from '../services/auth.service'

import { RequestUser } from 'src/utils/type.shared'

@Controller('auth')
export class AuthController {
    public constructor(private readonly authService: AuthService) {}

    /**
     * Method that can return the token
     * @param requestUser stores the user base data
     */
    @UseGuards(LocalAuthGuard)
    @Post('/local')
    public async signIn(@User() user: RequestUser): Promise<TokenProxy> {
        return await this.authService.signIn(user)
    }
}
