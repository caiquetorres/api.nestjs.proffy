import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import {
    Crud,
    CrudRequest,
    GetManyDefaultResponse,
    ParsedRequest,
    CrudRequestInterceptor
} from '@nestjsx/crud'

import { Roles } from '../../../decorators/roles/roles.decorator'
import { User } from '../../../decorators/user/user.decorator'

import { JwtAuthGuard } from '../../../guards/jwt/jwt.guard'
import { RolesAuthGuard } from '../../../guards/roles/roles.guard'

import { SubjectEntity } from '../entities/subject.entity'

import { CreateSubjectPayload } from '../models/create-subject.payload'
import { SubjectProxy } from '../models/subject.proxy'
import { UpdateSubjectPayload } from '../models/update-subject.payload'

import { SubjectService } from '../services/subject.service'

import { RequestUser } from '../../../utils/type.shared'
import { mapCrud } from 'src/utils/crud'

import { RoleTypes } from '../../../models/enums/roles.enum'

@Crud({
    model: {
        type: SubjectEntity
    }
})
@Controller('subjects')
export class SubjectController {
    public constructor(private readonly subjectService: SubjectService) {}

    /**
     * Method that can save a subject entity in the database
     * @param requestUser stores the user basic data
     * @param createSubjectPayload stores the new subject data
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.ADMIN)
    @UseGuards(JwtAuthGuard)
    @Post()
    public async create(
        @User() requestUser: RequestUser,
        @Body() createSubjectPayload: CreateSubjectPayload
    ): Promise<SubjectProxy> {
        const entity = await this.subjectService.create(
            requestUser,
            createSubjectPayload
        )
        return entity.toProxy()
    }

    /**
     * Method that can return a subject entity
     * @param subjectId stores the subject id
     */
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async get(@Param('id') subjectId: number): Promise<SubjectProxy> {
        const entity = await this.subjectService.list(subjectId)
        return entity.toProxy()
    }

    /**
     * Method that can return subject entities
     * @param crudRequest stores the user request parsed
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CrudRequestInterceptor)
    @Get()
    public async getMany(
        @ParsedRequest() crudRequest: CrudRequest
    ): Promise<GetManyDefaultResponse<SubjectProxy> | SubjectProxy[]> {
        const getMany = await this.subjectService.listMany(crudRequest)
        return mapCrud(getMany)
    }

    /**
     * Method that can modify the subject data
     * @param requestUser stores the user basic data
     * @param subjectId stores the subject id
     * @param updateSubjectPayload stores the new subject data
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.ADMIN)
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    public async update(
        @User() requestUser: RequestUser,
        @Param('id') subjectId: number,
        @Body() updateSubjectPayload: UpdateSubjectPayload
    ): Promise<void> {
        await this.subjectService.update(
            requestUser,
            subjectId,
            updateSubjectPayload
        )
    }

    /**
     * Method that can remove a subject entity from the database
     * @param requestUser stores the user basic data
     * @param subjectId store the subjec id
     */
    @UseGuards(RolesAuthGuard)
    @Roles(RoleTypes.ADMIN)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    public async delete(
        @User() requestUser: RequestUser,
        @Param('id') subjectId: number
    ): Promise<void> {
        await this.subjectService.delete(requestUser, subjectId)
    }
}
