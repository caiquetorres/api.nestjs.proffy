import { IsHour } from 'src/decorators/validators/is-hour.decorator'
import { IsWeekDay } from 'src/decorators/validators/is-week-day.decorator'

import { IsDefined } from 'class-validator'

export class CreateTimePayload {
    @IsDefined({ message: 'It is required to inform the week day.' })
    @IsWeekDay({
        message: 'It is required to send a valid week day'
    })
    public weekDay: number

    @IsHour({ message: 'It is required to inform a valid hour' })
    @IsDefined({ message: 'It is required to inform the start date.' })
    public from: string

    @IsHour({ message: 'It is required to inform a valid hour' })
    @IsDefined({ message: 'It is required to inform the end data.' })
    public to: string
}
