import { TimeEntity } from '../entities/time.entity'

import { UserProxy } from 'src/modules/user/models/user.proxy'

export class TimeProxy {
    public id: number
    public weekDay: number
    public from: Date
    public to: Date
    public user: UserProxy

    public constructor(entity: TimeEntity) {
        this.id = entity.id
        this.weekDay = entity.weekDay
        this.from = entity.from
        this.to = entity.to
        this.user = entity.user.toProxy()
    }
}
