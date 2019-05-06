import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { UserLocation } from "./userLocation";

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field()
    @Column()
    public username: string;

    @Field()
    @Column()
    public email: string;

    @Column()
    public password: string;

    @OneToMany((type) => UserLocation, (userLocation) => userLocation.user)
    public locationsConnection: UserLocation[];
}