import {
    BaseEntity as BaseEntityTypeOrm,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

export class BaseEntity extends BaseEntityTypeOrm {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    public static async exists(id: number): Promise<boolean> {
        const entity = await this.findOne({ id })
        return !!entity
    }
}
