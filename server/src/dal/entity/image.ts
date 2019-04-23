import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./person";
import { PersonImage } from "./personImage";

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
    @OneToMany((type) => PersonImage, (personImage) => personImage.person)
    public persons?: Person[];

}
