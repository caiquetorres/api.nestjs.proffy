import { Column, Entity, ManyToOne } from 'typeorm'

import { BaseEntity } from 'src/common/base-entity'
import { UserEntity } from 'src/modules/user/entities/user.entity'

import { TimeProxy } from '../models/time.proxy'
import { ToProxy } from 'src/common/to-proxy'

@Entity('times')
export class TimeEntity extends BaseEntity implements ToProxy<TimeProxy> {
    public constructor(partial: Partial<TimeEntity>) {
        super()
        Object.assign(this, partial)
    }

    @Column({
        type: 'int',
        nullable: false
    })
    public weekDay: number

    @Column({
        type: 'datetime',
        nullable: false
    })
    public from: Date

    @Column({
        type: 'datetime',
        nullable: false
    })
    public to: Date

    @ManyToOne(
        type => UserEntity,
        user => user.times,
        {
            onDelete: 'CASCADE'
        }
    )
    public user: UserEntity

    toProxy(): TimeProxy {
        return new TimeProxy(this)
    }
}
