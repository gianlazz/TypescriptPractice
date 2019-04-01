import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Guitar {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public userId: string;

    @Column()
    public brand: string;

    @Column()
    public model: number;

    @Column({ nullable: true })
    public year: number;

    @Column({ nullable: true })
    public color: string;

}
