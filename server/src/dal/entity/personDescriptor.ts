// import { Field, Float, ID, ObjectType } from "type-graphql";
// import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Image } from "./image";
// import { Person } from "./person";
// import { PersonImage } from "./personImage";

// @ObjectType()
// @Entity()
// export class PersonDescriptor extends BaseEntity {

//     @Field((type) => ID)
//     @PrimaryGeneratedColumn()
//     public id: number;

//     @Field((type) => [Float], { nullable: true })
//     @Column( "decimal", {array: true, nullable: true })
//     public descriptor?: number[];

//     @Field((type) => ID, { nullable: true })
//     @Column({ nullable: true })
//     public personId?: number;

//     @Field((type) => ID, { nullable: true })
//     @Column({ nullable: true })
//     public imageId?: number;

//     @Field((type) => Person)
//     @OneToOne((type) => PersonImage, (personImage) => personImage.person)
//     public person: Person;

//     @Field((type) => Image)
//     @OneToOne((type) => PersonImage, (personImage) => personImage.image)
//     public image: Image;

// }
