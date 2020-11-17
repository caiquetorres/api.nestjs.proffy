import { DefaultValidationMessages } from '../../../models/classes/default-validation-messages'
import { IsBase64, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateUserPayload {
    @IsOptional()
    @IsString({ message: DefaultValidationMessages.isString })
    public name?: string

    @IsOptional()
    @IsString({ message: DefaultValidationMessages.isString })
    public lastName?: string

    @IsOptional()
    @IsBase64({ message: DefaultValidationMessages.isBase64 })
    public photo?: string

    @IsOptional()
    @IsString({ message: DefaultValidationMessages.isString })
    public whatsapp?: string

    @IsOptional()
    @IsString({ message: DefaultValidationMessages.isString })
    public description?: string

    @IsOptional()
    @IsNumber({}, { message: DefaultValidationMessages.isNumber })
    public subjectId?: number

    @IsOptional()
    @IsNumber({}, { message: DefaultValidationMessages.isNumber })
    public price?: number
}
