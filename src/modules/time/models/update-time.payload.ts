import { IsHour } from 'src/decorators/validators/is-hour.decorator'
import { IsWeekDay } from 'src/decorators/validators/is-week-day.decorator'

import { IsOptional } from 'class-validator'

export class UpdateTimePayload {
    @IsOptional()
    @IsWeekDay({
        message: 'It is required to send a valid week day'
    })
    public weekDay?: number

    @IsOptional()
    @IsHour({ message: 'It is required to inform a valid hour' })
    public from?: string

    @IsHour({ message: 'It is required to inform a valid hour' })
    @IsOptional()
    public to?: string
}
