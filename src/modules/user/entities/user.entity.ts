import { Column } from 'typeorm'

import { BaseEntity } from 'src/common/base-entity'

import { UserProxy } from '../models/user.proxy'
import { ToProxy } from 'src/common/to-proxy'

export class UserEntity extends BaseEntity implements ToProxy<UserProxy> {
    public constructor(partial: Partial<UserEntity>) {
        super()
        Object.assign(this, partial)
    }

    @Column({
        type: 'text',
        nullable: true
    })
    public photo?: string

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
        length: 20,
        nullable: true
    })
    public whatsapp?: string

    @Column({
        type: 'text',
        nullable: true
    })
    public description?: string

    @Column({
        type: 'decimal',
        nullable: true
    })
    public price?: number

    public toProxy(): UserProxy {
        return new UserProxy(this)
    }
}
