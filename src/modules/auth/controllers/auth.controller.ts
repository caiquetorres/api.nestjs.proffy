import { Controller, Post, UseGuards } from '@nestjs/common'

import { TokenProxy } from '../models/token.proxy'

import { AuthService } from '../services/auth.service'

import { User } from 'src/decorators/user/user.decorator'
import { LocalAuthGuard } from 'src/guards/local.guard'
import { RequestUser } from 'src/utils/type.shared'

@Controller('auth')
export class AuthController {
    public constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/local')
    public async signIn(@User() user: RequestUser): Promise<TokenProxy> {
        return await this.authService.signIn(user)
    }
}
