import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Person } from "./person";
import { PersonImage } from "./personImage";

@Entity()
export class Image extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true })
    public image: string;

    @OneToMany((type) => PersonImage, (personImage) => personImage.person)
    public persons: Person[];

}
