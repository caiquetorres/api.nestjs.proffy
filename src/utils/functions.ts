import { RequestUser } from './type.shared'
import { Roles } from 'src/models/enums/roles.enum'

export function isAdminUser(user: RequestUser): boolean {
    return user && user.roles && hasRole(user.roles, Roles.ADMIN)
}

export function hasRole(roles: string, targetRoles: string): boolean {
    return (
        !isNullOrUndefined(roles) &&
        roles.split('|').some(role => role === targetRoles)
    )
}

export function hasPermission(id: number, user: RequestUser): boolean {
    return user.id === id || hasRole(user.roles, Roles.ADMIN)
}

export function isNullOrUndefined(value: unknown): boolean {
    return value === null || value === undefined
}
