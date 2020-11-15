import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TimeEntity } from './entities/time.entity'

import { TimeService } from './services/time.service'

import { TimeController } from './controllers/time.controller'

import { UserModule } from '../user/user.module'

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([TimeEntity])],
    controllers: [TimeController],
    providers: [TimeService],
    exports: [TimeService]
})
export class TimeModule {}
