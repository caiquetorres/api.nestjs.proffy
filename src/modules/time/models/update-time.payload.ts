import { IsNumber, IsOptional } from 'class-validator'
import { DefaultValidationMessages } from 'src/models/enums/default-validation-messages.enum'

export class UpdateTimePayload {
    @IsOptional()
    @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
    public weekDay?: number

    @IsOptional()
    public from?: Date

    @IsOptional()
    public to?: Date
}
