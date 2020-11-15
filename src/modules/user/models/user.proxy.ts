import { UserEntity } from '../entities/user.entity'

import { SubjectProxy } from 'src/modules/subject/models/subject.proxy'

export class UserProxy {
    public id: number
    public photo?: string
    public name: string
    public lastName: string
    public email: string
    public roles: string
    public whatsapp?: string
    public description?: string
    public subject?: SubjectProxy
    public price?: number

    public constructor(entity: UserEntity) {
        this.id = entity.id
        this.photo = entity.photo
        this.name = entity.name
        this.lastName = entity.lastName
        this.email = entity.email
        this.roles = entity.roles
        this.whatsapp = entity.whatsapp
        this.description = entity.description
        this.subject = entity.subject?.toProxy()
        this.price = entity.price
    }
}
