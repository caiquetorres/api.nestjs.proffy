/**
 * Function that can check if the string is null or undefined
 * @param sentence stores the string data
 */
export function isNullOrUndefined(sentence: unknown): boolean {
    return sentence === null || sentence === undefined
}
