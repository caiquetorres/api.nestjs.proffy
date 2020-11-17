import { DefaultValidationMessages } from '../../../models/classes/default-validation-messages'
import { IsOptional, IsString } from 'class-validator'

export class UpdateSubjectPayload {
    @IsOptional()
    @IsString({ message: DefaultValidationMessages.isString })
    name?: string
}
