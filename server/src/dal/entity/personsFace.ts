import { type } from "os";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class PersonsFace extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true })
    public name: string;

    @Column({ nullable: true })
    public image: string;

    @Column( "decimal", {array: true, nullable: true })
    public descriptor: number[];

}
