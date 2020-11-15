import { IsDefined, IsNumber } from 'class-validator'
import { DefaultValidationMessages } from 'src/models/enums/default-validation-messages.enum'

export class CreateFavoritePayload {
    @IsDefined({ message: 'It is necessary to inform the favorite id' })
    @IsNumber({}, { message: DefaultValidationMessages.IsNumber })
    public favoriteUserId: number
}
