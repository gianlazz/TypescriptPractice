import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Image } from "./image";
import { Person } from "./person";
import { PersonImage } from "./personImage";

@Entity()
export class PersonDescriptor extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column( "decimal", {array: true, nullable: true })
    public descriptor: number[];

    @OneToOne((type) => PersonImage, (personImage) => personImage.person)
    public person: Person;

    @OneToOne((type) => PersonImage, (personImage) => personImage.image)
    public image: Image;

}
