import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages.enum'
import { IsOptional, IsString } from 'class-validator'

export class UpdateSubjectPayload {
    @IsOptional()
    @IsString({ message: DefaultValidationMessages.IsString })
    name?: string
}
