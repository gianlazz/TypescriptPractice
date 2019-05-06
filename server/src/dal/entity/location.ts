import { ObjectType, Field, ID } from "type-graphql";
import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { UserLocation } from "./userLocation";

@ObjectType()
@Entity()
export class Location extends BaseEntity {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field()
    @Column({ nullable: true })
    public name: string;

    @Field()
    @Column({ nullable: true })
    public description: string;

    @Field()
    @Column({ nullable: true })    
    public latitude: string;

    @Field()
    @Column({ nullable: true })
    public longitude: string;

    @OneToMany(type => UserLocation, (userLocation) => userLocation.location)
    public usersConnection: UserLocation[];

}