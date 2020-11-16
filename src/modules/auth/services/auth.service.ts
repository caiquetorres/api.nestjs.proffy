import {
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserEntity } from 'src/modules/user/entities/user.entity'

import { LoginPayload } from '../models/login.payload'
import { TokenProxy } from '../models/token.proxy'

import { comparePassword } from 'src/utils/password'
import { RequestUser } from 'src/utils/type.shared'

@Injectable()
export class AuthService {
    public constructor(private readonly jwtService: JwtService) {}

    /**
     * Method that can return the token
     * @param requestUser stores the user base data
     */
    public async signIn(requestUser: RequestUser): Promise<TokenProxy> {
        const token = await this.jwtService.signAsync(requestUser)
        return new TokenProxy(token)
    }

    /**
     * Method that can validate if the user exists in the database and if
     * the password that is passing in parameters match with the one in the
     * database
     * @param loginPayload stores the data that will be tested
     */
    public async authenticate(
        loginPayload: LoginPayload
    ): Promise<RequestUser> {
        const { password, email } = loginPayload
        const entity = await UserEntity.findOne({ email })

        if (!entity)
            throw new NotFoundException(
                `The entity identified by to '${email}' was not found`
            )

        const passwordIsMatch = await comparePassword(password, entity.password)

        if (!passwordIsMatch)
            throw new UnauthorizedException(
                'You have no permission to access those sources'
            )

        return {
            email,
            id: entity.id,
            roles: entity.roles
        }
    }
}
