import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number


    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'number' })
    price: number
}
