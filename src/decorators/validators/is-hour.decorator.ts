import { registerDecorator, ValidationOptions } from 'class-validator'

/**
 * Decorator that checks if the value that will be tested is of type
 * "Hour" with format "HH:MM"
 * @param validationOptions stores all the options
 */
export function IsHour(validationOptions?: ValidationOptions) {
    return function(object: unknown, propertyName: string): void {
        registerDecorator({
            name: 'isHour',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: string): boolean {
                    const splittedArray = value.split(':')
                    if (splittedArray.length != 2) return false

                    const hours = Number(splittedArray[0])
                    const minutes = Number(splittedArray[1])

                    if (
                        hours < 0 ||
                        minutes < 0 ||
                        hours > 23 ||
                        minutes > 59 ||
                        Number.isNaN(hours) ||
                        Number.isNaN(minutes)
                    )
                        return false

                    return true
                }
            }
        })
    }
}
