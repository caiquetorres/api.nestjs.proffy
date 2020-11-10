import { Controller } from '@nestjs/common'

import { SubjectService } from '../services/subject.service'

@Controller('subject')
export class SubjectController {
    public constructor(private readonly subjectService: SubjectService) {}
}
