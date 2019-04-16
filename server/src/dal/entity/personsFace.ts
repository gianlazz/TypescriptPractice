import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class PersonsFace extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true })
    public name: string;

    @Column({ nullable: true })
    public image: string;

    @Column({ nullable: true })
    public jsonDescriptor: string;

}
