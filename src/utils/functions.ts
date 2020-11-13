import { RequestUser } from './type.shared'
import { Roles } from 'src/models/enums/roles.enum'

/**
 * Function that can test if the request user has the type "ADMIM"
 * @param requestUser stores the user basic data
 */
export function isAdminUser(requestUser: RequestUser): boolean {
    return (
        requestUser &&
        requestUser.roles &&
        hasRole(requestUser.roles, Roles.ADMIN)
    )
}

/**
 * Function that can compare roles
 * @param roles stores the roles that will be compared
 * @param targetRoles stores one or more roles that will be compared as well
 */
export function hasRole(roles: string, targetRoles: string): boolean {
    return (
        !isNullOrUndefined(roles) &&
        roles.split('|').some(role => role === targetRoles)
    )
}

/**
 * Function that can check if the user (identified by "id") has the permission
 * @param id stores the user id
 * @param requestUser stores the user basic data
 */
export function hasPermission(id: number, requestUser: RequestUser): boolean {
    return requestUser.id === id || hasRole(requestUser.roles, Roles.ADMIN)
}

/**
 * Function that can check if the string is null or undefined
 * @param sentence stores the string data
 */
export function isNullOrUndefined(sentence: unknown): boolean {
    return sentence === null || sentence === undefined
}
