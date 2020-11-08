import { Module } from '@nestjs/common'

import { FavoriteController } from './controllers/favorite.controller'

import { FavoriteService } from './services/favorite.service'

@Module({
    controllers: [FavoriteController],
    providers: [FavoriteService]
})
export class FavoriteModule {}
