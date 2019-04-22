import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { PersonsFace } from "./personsFace";

@Entity()
export class Person extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true })
    public name: string;

    @Column({ nullable: true })
    public firstSeenDateTime: string;

    // @Column({ nullable: true })
    // public descriptors: PersonsFace[];

    // @OneToMany(type => Sighting, )

}
