import { UserEntity } from '../entities/user.entity'

import { SubjectProxy } from 'src/modules/subject/models/subject.proxy'

export class UserProxy {
    public id: number
    public image?: string
    public name: string
    public lastName: string
    public email: string
    public roles: string
    public whatsapp?: string
    public about?: string
    public subject?: SubjectProxy
    public cost?: number

    public constructor(entity: UserEntity) {
        this.id = entity.id
        this.image = entity.image
        this.name = entity.name
        this.lastName = entity.lastName
        this.email = entity.email
        this.roles = entity.roles
        this.whatsapp = entity.whatsapp
        this.about = entity.about
        this.subject = entity.subject?.toProxy()
        this.cost = entity.cost
    }
}
