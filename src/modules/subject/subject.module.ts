import { Module } from '@nestjs/common'

import { SubjectController } from './controllers/subject.controller'

import { SubjectService } from './services/subject.service'

@Module({
    controllers: [SubjectController],
    providers: [SubjectService]
})
export class SubjectModule {}
