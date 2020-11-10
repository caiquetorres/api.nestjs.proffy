import { Controller } from '@nestjs/common'

import { UserService } from '../services/user.service'

@Controller('user')
export class UserController {
    public constructor(private readonly userService: UserService) {}
}
