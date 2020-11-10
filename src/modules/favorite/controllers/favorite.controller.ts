import { Controller } from '@nestjs/common'

import { FavoriteService } from '../services/favorite.service'

@Controller('favorite')
export class FavoriteController {
    public constructor(private readonly favoriteService: FavoriteService) {}
}
