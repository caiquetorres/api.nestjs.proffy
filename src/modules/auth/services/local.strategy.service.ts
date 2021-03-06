import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { AuthService } from './auth.service'

import { RequestUser } from 'src/utils/type.shared'

import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    public constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        })
    }

    public async validate(
        username: string,
        password: string
    ): Promise<RequestUser> {
        return this.authService.authenticate({ password, email: username })
    }
}
