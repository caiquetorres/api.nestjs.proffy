import { UserEntity } from '../entities/user.entity'

export class UserProxy {
    public id: number
    public photo?: string
    public name: string
    public lastName: string
    public email: string
    public whatsapp?: string
    public description?: string
    public price?: number

    public constructor(entity: UserEntity) {
        this.id = entity.id
        this.photo = entity.photo
        this.name = entity.name
        this.lastName = entity.lastName
        this.email = entity.email
        this.whatsapp = entity.whatsapp
        this.description = entity.description
        this.price = entity.price
    }
}
