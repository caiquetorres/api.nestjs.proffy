import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { ExtractJwt, Strategy } from 'passport-jwt'
import { RequestUser } from 'src/utils/type.shared'

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
