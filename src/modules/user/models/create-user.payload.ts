import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator'
import { DefaultValidationMessages } from 'src/models/classes/default-validation-messages'

export class CreateUserPayload {
    @IsDefined({ message: 'É necessário informar o nome.' })
    @IsString({ message: DefaultValidationMessages.isString })
    public name: string

    @IsDefined({ message: 'É necessário informar o sobrenome.' })
    @IsString({ message: DefaultValidationMessages.isString })
    public lastName: string

    @IsDefined({ message: 'É necessário informar o email.' })
    @IsString({ message: DefaultValidationMessages.isString })
    public email: string

    @IsDefined({ message: 'É necessário informar a senha.' })
    @IsString({ message: DefaultValidationMessages.isString })
    @IsEmail({}, { message: DefaultValidationMessages.isEmail })
    public password: string

    @IsOptional()
    @IsString({ message: DefaultValidationMessages.isString })
    public roles: string
}
