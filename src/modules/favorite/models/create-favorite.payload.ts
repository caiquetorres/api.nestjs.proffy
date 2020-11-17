import { IsDefined, IsNumber } from 'class-validator'
import { DefaultValidationMessages } from 'src/models/classes/default-validation-messages'

export class CreateFavoritePayload {
    @IsDefined({ message: 'It is required to inform the favorite id' })
    @IsNumber({}, { message: DefaultValidationMessages.isNumber })
    public favoriteUserId: number
}
