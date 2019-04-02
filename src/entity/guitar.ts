import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Guitar extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false })
    public userId: string;

    @Column({ nullable: false })
    public brand: string;

    @Column({ nullable: false })
    public model: string;

    @Column({ nullable: true })
    public year: number;

    @Column({ nullable: true })
    public color: string;

}
