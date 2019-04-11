import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";

@Entity()
export class Sighting extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    
}