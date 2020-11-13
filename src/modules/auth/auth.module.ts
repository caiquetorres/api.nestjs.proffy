import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './services/auth.service'
import { JwtStrategy } from './services/jwt.strategy.service'
import { LocalStrategy } from './services/local.strategy.service'

import { AuthController } from './controllers/auth.controller'

import { UserModule } from '../user/user.module'

@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
            secret: 'secrect',
            signOptions: { expiresIn: '1h' }
        })
    ],
    providers: [AuthService, JwtStrategy, LocalStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
