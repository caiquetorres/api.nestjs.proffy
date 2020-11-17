import { IsDefined, IsString } from 'class-validator'
import { DefaultValidationMessages } from 'src/models/classes/default-validation-messages'

export class CreateSubjectPayload {
    @IsDefined({ message: 'It is required inform the subject name.' })
    @IsString({ message: DefaultValidationMessages.isString })
    public name: string
}
