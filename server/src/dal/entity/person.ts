import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./image";
import { PersonImage } from "./personImage";

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
    @OneToMany((type) => PersonImage, (personImage) => personImage.image)
    public images?: Image[];

}
