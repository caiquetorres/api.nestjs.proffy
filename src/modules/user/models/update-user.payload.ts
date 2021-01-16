import { DefaultValidationMessages } from '../../../models/classes/default-validation-messages'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateUserPayload {
    @IsOptional()
    @IsString({ message: DefaultValidationMessages.isString })
    public name?: string

    @IsOptional()
    @IsString({ message: DefaultValidationMessages.isString })
    public lastName?: string

    @IsOptional()
    @IsString({ message: DefaultValidationMessages.isString })
    public image?: string

    @IsOptional()
    public whatsapp?: string

    @IsOptional()
    @IsString({ message: DefaultValidationMessages.isString })
    public about?: string

    @IsOptional()
    @IsNumber({}, { message: DefaultValidationMessages.isNumber })
    public subjectId?: number

    @IsOptional()
    @IsNumber({}, { message: DefaultValidationMessages.isNumber })
    public cost?: number
}
