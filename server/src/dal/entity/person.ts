import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./image";

@ObjectType()
@Entity()
export class Person extends BaseEntity {

    @Field((type) => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public name?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public firstSeenDateTime: string;

    @Field((type) => [Image], { nullable: true })
    @ManyToMany((type) => Image, (image) => image.persons, { eager: true})
    public images: Image[];

}
