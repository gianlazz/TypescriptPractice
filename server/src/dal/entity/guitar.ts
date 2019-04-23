import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { Field, ID, Int } from "type-graphql";

@Entity()
export class Guitar extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field()
    @Column({ nullable: false })
    public userId: string;

    @Field()
    @Column({ nullable: false })
    public brand: string;

    @Field()
    @Column({ nullable: false })
    public model: string;

    @Field(type => Int, { nullable: true })
    @Column({ nullable: true })
    public year: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public color: string;

}
