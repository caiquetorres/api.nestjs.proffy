import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './services/auth.service'
import { JwtStrategy } from './services/jwt.strategy.service'
import { LocalStrategy } from './services/local.strategy.service'

import { AuthController } from './controllers/auth.controller'

import { UserModule } from '../user/user.module'

@Module({
    imports: [
        ConfigModule,
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                privateKey: configService.get<string>('JWT_SECRET')
            })
        })
    ],
    providers: [AuthService, JwtStrategy, LocalStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
