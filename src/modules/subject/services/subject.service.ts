import {
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { SubjectEntity } from '../entities/subject.entity'

import { CreateSubjectPayload } from '../models/create-subject.payload'
import { UpdateSubjectPayload } from '../models/update-subject.payload'

import { RequestUser } from '../../../utils/type.shared'
import { isAdminUser } from '../../../utils/validation'

@Injectable()
export class SubjectService extends TypeOrmCrudService<SubjectEntity> {
    public constructor(
        @InjectRepository(SubjectEntity)
        private readonly repository: Repository<SubjectEntity>
    ) {
        super(repository)
    }

    /**
     * Method that can save a subject entity in the database
     * @param requestUser stores the user basic data
     * @param createSubjectPayload stores the new subject data
     */
    public async create(
        requestUser: RequestUser,
        createSubjectPayload: CreateSubjectPayload
    ): Promise<SubjectEntity> {
        if (!isAdminUser(requestUser))
            throw new UnauthorizedException(
                'You have no permission to access those sources'
            )

        const entity = new SubjectEntity(createSubjectPayload)
        return await entity.save()
    }

    /**
     * Method that can return a subject entity
     * @param subjectId stores the subject id
     */
    public async get(subjectId: number): Promise<SubjectEntity> {
        const entity = await SubjectEntity.findOne({ id: subjectId })
        if (!entity)
            throw new NotFoundException(
                `The entity identified by "${subjectId}" was not found`
            )
        return entity
    }

    /**
     * Method that can modify the subject data
     * @param requestUser stores the user basic data
     * @param subjectId stores the subject id
     * @param updateSubjectPayload stores the new subject data
     */
    public async update(
        requestUser: RequestUser,
        subjectId: number,
        updateSubjectPayload: UpdateSubjectPayload
    ): Promise<void> {
        if (!isAdminUser(requestUser))
            throw new UnauthorizedException(
                'You have no permission to access those sources'
            )

        const exists = await SubjectEntity.exists(subjectId)
        if (!exists)
            throw new NotFoundException(
                `The entity identified by "${subjectId}" was not found`
            )

        await SubjectEntity.update({ id: subjectId }, updateSubjectPayload)
    }

    /**
     * Method that can remove a subject entity from the database
     * @param requestUser stores the user basic data
     * @param subjectId store the subjec id
     */
    public async delete(
        requestUser: RequestUser,
        subjectId: number
    ): Promise<void> {
        if (!isAdminUser(requestUser))
            throw new UnauthorizedException(
                'You have no permission to access those sources'
            )

        const exists = await SubjectEntity.exists(subjectId)
        if (!exists)
            throw new NotFoundException(
                `The entity identified by "${subjectId}" was not found`
            )

        await SubjectEntity.delete({ id: subjectId })
    }
}
