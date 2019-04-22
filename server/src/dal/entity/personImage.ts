import {BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { Image } from "./image";
import { Person } from "./person";
import { PersonDescriptor } from "./personDescriptor";

@Entity()
export class PersonImage extends BaseEntity {

    @PrimaryColumn()
    public personId: number;

    @PrimaryColumn()
    public imageId: number;

    @PrimaryColumn()
    public personDescriptorId: number;

    @OneToOne(() => Person)
    @JoinColumn()
    public person: Person;

    @OneToOne(() => Image)
    @JoinColumn()
    public image: Image;

    @OneToOne(() => PersonDescriptor)
    public personDescriptor: PersonDescriptor;

}
