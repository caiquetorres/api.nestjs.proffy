import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'

import { BaseEntity } from 'src/common/base-entity'
import { FavoriteEntity } from 'src/modules/favorite/entities/favorite.entity'
import { SubjectEntity } from 'src/modules/subject/entities/subject.entity'
import { TimeEntity } from 'src/modules/time/entities/time.entity'

import { UserProxy } from '../models/user.proxy'
import { ToProxy } from 'src/common/to-proxy'

@Entity('users')
export class UserEntity extends BaseEntity implements ToProxy<UserProxy> {
    public constructor(partial: Partial<UserEntity>) {
        super()
        Object.assign(this, partial)
    }

    @Column({
        type: 'text',
        nullable: true
    })
    public image?: string

    @Column({
        type: 'varchar',
        length: 40,
        nullable: false
    })
    public name: string

    @Column({
        type: 'varchar',
        length: 40,
        nullable: false
    })
    public lastName: string

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    public password: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    public email: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    public roles: string

    @Column({
        type: 'varchar',
        length: 20,
        nullable: true
    })
    public whatsapp?: string

    @Column({
        type: 'text',
        nullable: true
    })
    public about?: string

    @Column({
        type: 'decimal',
        nullable: true
    })
    public cost?: number

    @ManyToOne(
        () => SubjectEntity,
        subject => subject.users
    )
    public subject: SubjectEntity

    @OneToMany(
        () => TimeEntity,
        time => time.user
    )
    public times: TimeEntity[]

    @OneToMany(
        () => FavoriteEntity,
        favorite => favorite.user
    )
    public users: FavoriteEntity[]

    @OneToMany(
        () => FavoriteEntity,
        favorite => favorite.favoriteUser
    )
    public favorites: FavoriteEntity[]

    public toProxy(): UserProxy {
        return new UserProxy(this)
    }

    public static async hasUserWithEmail(email: string): Promise<boolean> {
        const entity = await this.findOne({ email })
        return !!entity
    }
}
