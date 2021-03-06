import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean> | boolean {
        const roles = new Reflector().get<string[]>(
            'roles',
            context.getHandler()
        )

        if (!roles) return true

        const user = context.switchToHttp().getRequest().user

        if (!user)
            throw new UnauthorizedException(
                'You have no permission to access those sources'
            )

        const hasRole = () =>
            user.roles.split('|').some((role: string) => roles.includes(role))

        if (user && user.roles && hasRole()) return true

        throw new UnauthorizedException(
            'You have no permission to access those sources'
        )
    }
}
