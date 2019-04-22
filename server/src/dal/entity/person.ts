import {BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Image } from "./image";
import { PersonsFace } from "./personsFace";

@Entity()
export class Person extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true })
    public name: string;

    @Column({ nullable: true })
    public firstSeenDateTime: string;

    @ManyToMany((type) => Image, (image) => image.persons)
    @JoinTable()
    public images: Image[];

}
