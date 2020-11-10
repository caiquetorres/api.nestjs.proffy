import { IsDefined, IsString } from 'class-validator'
import { DefaultValidationMessages } from 'src/models/enums/default-validation-messages'

export class CreateSubjectPayload {
    @IsDefined({ message: 'É necessário informar o nome da matéria.' })
    @IsString({ message: DefaultValidationMessages.IsString })
    public name: string
}
