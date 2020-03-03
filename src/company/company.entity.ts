import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class Company extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organization: string;

    @Column()
    contact_person: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    address: string;
}