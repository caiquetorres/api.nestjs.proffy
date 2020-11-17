import { IsNumber, IsOptional } from 'class-validator'
import { DefaultValidationMessages } from 'src/models/classes/default-validation-messages'

export class UpdateTimePayload {
    @IsOptional()
    @IsNumber({}, { message: DefaultValidationMessages.isNumber })
    public weekDay?: number

    @IsOptional()
    public from?: Date

    @IsOptional()
    public to?: Date
}
