import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Guitar {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    brand: string;

    @Column()
    model: number;

    @Column({ nullable: true })
    year: number;

    @Column({ nullable: true })
    color: string;
    
}