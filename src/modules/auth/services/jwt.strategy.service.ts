import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { RequestUser } from 'src/utils/type.shared'

import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret_key'
        })
    }

    public async validate(requestUser: RequestUser): Promise<RequestUser> {
        return {
            id: requestUser.id,
            email: requestUser.email,
            roles: requestUser.roles
        }
    }
}
