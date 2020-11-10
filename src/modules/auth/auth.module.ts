import { Module } from '@nestjs/common'

import { AuthController } from './controllers/auth.controller'

import { AuthService } from './services/auth.service'
import { JwtStrategy } from './services/jwt.strategy.service'
import { LocalStrategy } from './services/local.strategy.service'

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy],
    exports: [AuthService]
})
export class AuthModule {}
