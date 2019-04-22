import {BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { Person } from "./person";

@Entity()
export class Image extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToMany((type) => Person, (person) => person.images)
    public persons: Person[];

    @Column({ nullable: true })
    public image: string;

}
