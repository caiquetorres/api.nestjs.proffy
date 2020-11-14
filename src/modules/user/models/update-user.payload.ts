import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages.enum'
import { IsOptional, IsString } from 'class-validator'

export class UpdateUserPayload {
    @IsOptional()
    @IsString({ message: DefaultValidationMessages.IsString })
    public name?: string

    @IsOptional()
    @IsString({ message: DefaultValidationMessages.IsString })
    public lastName?: string
}
