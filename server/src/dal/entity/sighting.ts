import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Sighting extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

}
