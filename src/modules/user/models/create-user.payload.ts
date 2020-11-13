import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator'
import { DefaultValidationMessages } from 'src/models/enums/default-validation-messages.enum'

export class CreateUserPayload {
    @IsDefined({ message: 'É necessário informar o nome.' })
    @IsString({ message: DefaultValidationMessages.IsString })
    public name: string

    @IsDefined({ message: 'É necessário informar o sobrenome.' })
    @IsString({ message: DefaultValidationMessages.IsString })
    public lastName: string

    @IsDefined({ message: 'É necessário informar o email.' })
    @IsString({ message: DefaultValidationMessages.IsString })
    public email: string

    @IsDefined({ message: 'É necessário informar a senha.' })
    @IsString({ message: DefaultValidationMessages.IsString })
    @IsEmail({}, { message: DefaultValidationMessages.IsEmail })
    public password: string

    @IsOptional()
    @IsString({ message: DefaultValidationMessages.IsString })
    public roles: string
}
