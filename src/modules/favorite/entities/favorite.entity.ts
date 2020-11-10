import { Entity, ManyToOne } from 'typeorm'

import { BaseEntity } from 'src/common/base-entity'
import { UserEntity } from 'src/modules/user/entities/user.entity'

@Entity('favorites')
export class FavoriteEntity extends BaseEntity {
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
}
