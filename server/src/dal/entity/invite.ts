import { ObjectType, Field, ID } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Invite extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field()
    @Column()
    public email: string;
}