import { Controller } from '@nestjs/common'

import { TimeService } from '../services/time.service'

@Controller('users/:userId/times')
export class TimeController {
    public constructor(private readonly timeService: TimeService) {}
}
