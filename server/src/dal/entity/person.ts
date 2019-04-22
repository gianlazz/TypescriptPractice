import {BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Image } from "./image";
import { PersonImage } from "./personImage";

@Entity()
export class Person extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true })
    public name: string;

    @Column({ nullable: true })
    public firstSeenDateTime: string;

    @OneToMany((type) => PersonImage, (personImage) => personImage.image)
    public images: Image[];

}
