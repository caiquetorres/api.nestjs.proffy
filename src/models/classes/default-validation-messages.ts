export class DefaultValidationMessages {
    public static isBoolean = 'It is required to send a valid boolean value.'
    public static isArray = 'It is required send a valid array.'
    public static isNumber = 'It is required to send a number.'
    public static isString = 'It is required to send a valid text.'
    public static isJSON = 'It is required send a valid JSON.'
    public static isUrl = 'It is required to send a valid url.'
    public static isBase64 = 'It is required to send a valid base64 string.'
    public static isEmail = 'It is required to send a valid e-mail.'
    public static isMobilePhone =
        'It is required to send a valid telephone number. Ex: (015) 90000-0000'
    public static isNotEmpty = 'It is not allowed to send a blanck text.'
    public static unauthorized =
        'You have no permission to access those sources'

    public static entityNotFoundDefaultMessage(
        identifier: string | number
    ): string {
        return `The entity identified by ${identifier} was not found`
    }
}
