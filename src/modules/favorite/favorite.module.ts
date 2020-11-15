import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FavoriteEntity } from './entities/favorite.entity'

import { FavoriteService } from './services/favorite.service'

import { FavoriteController } from './controllers/favorite.controller'

import { UserModule } from '../user/user.module'

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([FavoriteEntity])],
    controllers: [FavoriteController],
    providers: [FavoriteService],
    exports: [FavoriteService]
})
export class FavoriteModule {}
