import { Column, Entity, OneToMany } from 'typeorm'

import { BaseEntity } from 'src/common/base-entity'
import { UserEntity } from 'src/modules/user/entities/user.entity'

import { SubjectProxy } from '../models/subject.proxy'
import { ToProxy } from 'src/common/to-proxy'

@Entity('subjects')
export class SubjectEntity extends BaseEntity implements ToProxy<SubjectProxy> {
    public constructor(partial: Partial<SubjectEntity>) {
        super()
        Object.assign(this, partial)
    }

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    public name: string

    @OneToMany(
        () => UserEntity,
        user => user.subject
    )
    users: UserEntity[]

    public toProxy(): SubjectProxy {
        return new SubjectProxy(this)
    }
}
