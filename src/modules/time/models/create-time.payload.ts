import { IsDefined, IsNumber } from 'class-validator'
import { DefaultValidationMessages } from 'src/models/classes/default-validation-messages'

export class CreateTimePayload {
    @IsNumber({}, { message: DefaultValidationMessages.isNumber })
    @IsDefined({ message: 'It is required to inform the week day.' })
    public weekDay: number

    @IsDefined({ message: 'It is required to inform the start date.' })
    public from: Date

    @IsDefined({ message: 'It is required to inform the end data.' })
    public to: Date

    @IsNumber({}, { message: DefaultValidationMessages.isNumber })
    @IsDefined({ message: 'It is required to inform the user id.' })
    public userId: number
}
