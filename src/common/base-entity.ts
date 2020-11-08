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
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date

    public static async exists(id: number): Promise<boolean> {
        return !!this.find({ id })
    }
}
