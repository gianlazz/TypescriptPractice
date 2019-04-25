import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./person";

@ObjectType()
@Entity()
export class Image extends BaseEntity {

    @Field((type) => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public image: string;

    @Field((type) => [Person], { nullable: true })
    @ManyToMany((type) => Person, (person) => person.images)
    @JoinTable()
    public persons?: Person[];

}
