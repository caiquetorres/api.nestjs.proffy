import { IsDefined, IsNumber } from 'class-validator'
import { DefaultValidationMessages } from 'src/models/enums/default-validation-messages.enum'

export class CreateTimePayload {
    @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
    @IsDefined({ message: 'É necessário informar o dia da semana.' })
    public weekDay: number

    @IsDefined({ message: 'É necessário informar a data inicial.' })
    public from: Date

    @IsDefined({ message: 'É necessário informar a data final.' })
    public to: Date

    @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
    @IsDefined({ message: 'É necessário informar o id do usuário.' })
    public userId: number
}
