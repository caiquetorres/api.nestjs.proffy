import { DefaultValidationMessages } from '../../../models/enums/default-validation-messages.enum'
import { IsBase64, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateUserPayload {
    @IsOptional()
    @IsString({ message: DefaultValidationMessages.IsString })
    public name?: string

    @IsOptional()
    @IsString({ message: DefaultValidationMessages.IsString })
    public lastName?: string

    @IsOptional()
    @IsBase64({ message: DefaultValidationMessages.IsBase64 })
    public photo?: string

    @IsOptional()
    @IsString({ message: DefaultValidationMessages.IsString })
    public whatsapp?: string

    @IsOptional()
    @IsString({ message: DefaultValidationMessages.IsString })
    public description?: string

    @IsOptional()
    @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
    public price?: number
}
