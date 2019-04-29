import { Field, Float, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./image";
import { Person } from "./person";
import { PersonImage } from "./personImage";

@ObjectType()
@Entity()
export class PersonDescriptor extends BaseEntity {

    @Field((type) => ID)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field((type) => [Float], { nullable: true })
    @Column( "decimal", {array: true, nullable: true })
    public descriptor?: number[];

    // @OneToOne(type => PersonImage, personImage => personImage.personDescriptor)
    // public personImageConnection: number

    // @Field((type) => Person)
    // @OneToOne((type) => PersonImage, (personImage) => personImage.person)
    // public person: Person;

    // @Field((type) => Image)
    // @OneToOne((type) => PersonImage, (personImage) => personImage.image)
    // public image: Image;

}
