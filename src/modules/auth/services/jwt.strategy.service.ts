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
            secretOrKey: 'secret'
        })
    }

    public async validate(requestUser: RequestUser): Promise<RequestUser> {
        return requestUser
    }
}
