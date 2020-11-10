import { TimeEntity } from '../entities/time.entity'

import { UserProxy } from 'src/modules/user/models/user.proxy'

export class TimeProxy {
    public id: number
    public weekDay: number
    public from: Date
    public to: Date
    public user?: UserProxy

    /*
    rever
    */
    public constructor(partial: Partial<TimeEntity>) {
        Object.assign(this, partial)
    }
}
