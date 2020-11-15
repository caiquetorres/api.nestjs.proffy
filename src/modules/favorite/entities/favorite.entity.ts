import { Entity, ManyToOne } from 'typeorm'

import { BaseEntity } from 'src/common/base-entity'
import { UserEntity } from 'src/modules/user/entities/user.entity'

import { FavoriteProxy } from '../models/favorite.proxy'
import { ToProxy } from 'src/common/to-proxy'

@Entity('favorites')
export class FavoriteEntity extends BaseEntity
    implements ToProxy<FavoriteProxy> {
    public constructor(partial: Partial<FavoriteEntity>) {
        super()
        Object.assign(this, partial)
    }

    @ManyToOne(
        type => UserEntity,
        user => user.users
    )
    public user: UserEntity

    @ManyToOne(
        type => UserEntity,
        user => user.favorites
    )
    public favoriteUser: UserEntity

    toProxy(): FavoriteProxy {
        return new FavoriteProxy(this)
    }
}
