import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from './entities/user.entity'

import { UserService } from './services/user.service'

import { UserController } from './controllers/user.controller'

import { AuthModule } from '../auth/auth.module'
import { SubjectModule } from '../subject/subject.module'

@Module({
    imports: [
        SubjectModule,
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
