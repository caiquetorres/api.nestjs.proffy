import { TimeEntity } from '../entities/time.entity'

import { UserProxy } from 'src/modules/user/models/user.proxy'

// review
export class TimeProxy {
    public id?: number
    public weekDay?: number
    public from?: string
    public to?: string
    public user?: UserProxy

    public constructor(partial: Partial<TimeEntity>) {
        this.id = partial.id
        this.weekDay = partial.weekDay
        this.from = partial.from
        this.to = partial.to
        this.user = partial.user.toProxy()
    }
}
