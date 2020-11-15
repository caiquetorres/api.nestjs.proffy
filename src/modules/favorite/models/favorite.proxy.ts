import { FavoriteEntity } from '../entities/favorite.entity'

import { UserProxy } from 'src/modules/user/models/user.proxy'

export class FavoriteProxy {
    public id: number
    public favoriteUser: UserProxy

    public constructor(entity: FavoriteEntity) {
        this.id = entity.id
        this.favoriteUser = entity.favoriteUser.toProxy()
    }
}
