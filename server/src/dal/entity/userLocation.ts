import { ObjectType, Field, ID } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user";
import { Location } from "./location";

@ObjectType()
@Entity()
export class UserLocation extends BaseEntity {

    @Field(type => ID)
    @PrimaryColumn()
    public userId: number;

    @Field(type => ID)
    @PrimaryColumn()
    public locationId: number;

    @Field(type => User)
    @ManyToOne(() => User, (user) => user.locationsConnection, { primary: true })
    @JoinColumn()
    public user: User;

    @Field(type => Location)
    @ManyToOne(() => Location, (location) => location.usersConnection, { primary: true })
    @JoinColumn()
    public location: Location;

}