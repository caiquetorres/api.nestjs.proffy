import { SubjectEntity } from '../entities/subject.entity'

export class SubjectProxy {
    public id: number
    public name: string

    public constructor(entity: SubjectEntity) {
        this.id = entity.id
        this.name = entity.name
    }
}
