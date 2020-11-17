import { IsDefined, IsString } from 'class-validator'
import { DefaultValidationMessages } from 'src/models/classes/default-validation-messages'

export class LoginPayload {
    @IsDefined({ message: 'It is required to inform the e-mail' })
    @IsString({ message: DefaultValidationMessages.isString })
    public email: string

    @IsDefined({
        message: 'It is required to inform the password'
    })
    @IsString({ message: DefaultValidationMessages.isString })
    public password: string
}
