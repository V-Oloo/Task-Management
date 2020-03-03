import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class Employee extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    department: string;

    @Column()
    jobTitle: string;

    @Column({nullable: true})
    password: string;

    @Column({nullable: true})
    salt: string;

    @Column({nullable: true, default: 'INACTIVE'})
    status: string;

    @Column({ type: 'varchar', length: 300 })
    createdBy: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;




    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }


}