import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator'
import { DefaultValidationMessages } from 'src/models/classes/default-validation-messages'

export class CreateUserPayload {
    @IsDefined({ message: 'It is required to inform the name.' })
    @IsString({ message: DefaultValidationMessages.isString })
    public name: string

    @IsDefined({ message: 'It is required to inform the last name.' })
    @IsString({ message: DefaultValidationMessages.isString })
    public lastName: string

    @IsDefined({ message: 'It is required to inform the e-mail.' })
    @IsString({ message: DefaultValidationMessages.isString })
    @IsEmail({}, { message: DefaultValidationMessages.isEmail })
    public email: string

    @IsDefined({ message: 'It is required to inform the password' })
    @IsString({ message: DefaultValidationMessages.isString })
    public password: string

    @IsOptional()
    @IsString({ message: DefaultValidationMessages.isString })
    public roles: string
}
