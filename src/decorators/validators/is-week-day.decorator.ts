import { registerDecorator, ValidationOptions } from 'class-validator'

/**
 * Decorator that checks if the value that will be tested is a
 * week day number
 * @param validationOptions stores all the options
 */
export function IsWeekDay(validationOptions?: ValidationOptions) {
    return function(object: unknown, propertyName: string): void {
        registerDecorator({
            name: 'isWeekDay',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: number): boolean {
                    return (value >= 1 && value <= 7) || !Number.isNaN(value)
                }
            }
        })
    }
}
