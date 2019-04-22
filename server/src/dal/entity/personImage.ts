import {BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { Image } from "./image";
import { Person } from "./person";

@Entity()
export class personImage extends BaseEntity {

    @PrimaryColumn()
    public personId: number;

    @OneToOne(() => Person)
    @JoinColumn()
    public person: Person;

    @PrimaryColumn()
    public imageId: number;

    @OneToOne(() => Image)
    @JoinColumn()
    public image: Image;

}
