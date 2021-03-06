import {
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { SubjectEntity } from '../entities/subject.entity'

import { CreateSubjectPayload } from '../models/create-subject.payload'
import { UpdateSubjectPayload } from '../models/update-subject.payload'

import { RequestUser } from '../../../utils/type.shared'
import { isAdminUser } from '../../../utils/validation'

import { DefaultValidationMessages } from 'src/models/classes/default-validation-messages'

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
                DefaultValidationMessages.unauthorized
            )

        const entity = new SubjectEntity(createSubjectPayload)
        return await entity.save()
    }

    /**
     * Method that can return a subject entity
     * @param subjectId stores the subject id
     */
    public async list(subjectId: number): Promise<SubjectEntity> {
        const entity = await SubjectEntity.findOne({ id: subjectId })
        if (!entity)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFoundDefaultMessage(
                    subjectId
                )
            )
        return entity
    }

    /**
     * Method that can return subject entities
     * @param crudRequest stores the user request parsed
     */
    public async listMany(
        crudRequest: CrudRequest
    ): Promise<GetManyDefaultResponse<SubjectEntity> | SubjectEntity[]> {
        return await this.getMany(crudRequest)
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
                DefaultValidationMessages.unauthorized
            )

        const exists = await SubjectEntity.exists(subjectId)
        if (!exists)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFoundDefaultMessage(
                    subjectId
                )
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
                DefaultValidationMessages.unauthorized
            )

        const exists = await SubjectEntity.exists(subjectId)
        if (!exists)
            throw new NotFoundException(
                DefaultValidationMessages.entityNotFoundDefaultMessage(
                    subjectId
                )
            )

        await SubjectEntity.delete({ id: subjectId })
    }
}
