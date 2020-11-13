import { IsDefined, IsString } from 'class-validator'
import { DefaultValidationMessages } from 'src/models/enums/default-validation-messages.enum'

export class LoginPayload {
    @IsDefined({ message: 'It is necessary to inform the e-mail' })
    @IsString({ message: DefaultValidationMessages.IsString })
    public email: string

    @IsDefined({
        message: 'It is necessary to inform the password'
    })
    @IsString({ message: DefaultValidationMessages.IsString })
    public password: string
}
