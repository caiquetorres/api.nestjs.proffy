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
        type: 'tinyint',
        nullable: false
    })
    public weekDay: number

    @Column({
        type: 'time',
        nullable: false
    })
    public from: string

    @Column({
        type: 'time',
        nullable: false
    })
    public to: string

    @ManyToOne(
        () => UserEntity,
        user => user.times,
        {
            onDelete: 'CASCADE'
        }
    )
    public user: UserEntity

    public toProxy(): TimeProxy {
        return new TimeProxy(this)
    }
}
