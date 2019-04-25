// import { Field, ID, ObjectType } from "type-graphql";
// import { BaseEntity, Entity, JoinColumn, JoinTable, OneToOne, PrimaryColumn } from "typeorm";
// import { Image } from "./image";
// import { Person } from "./person";
// import { PersonDescriptor } from "./personDescriptor";

// @ObjectType()
// @Entity()
// export class PersonImage extends BaseEntity {

//     @Field((type) => ID)
//     @PrimaryColumn()
//     public personId: number;

//     @Field((type) => ID)
//     @PrimaryColumn()
//     public imageId: number;

//     // @Field((type) => ID)
//     // @PrimaryColumn()
//     // public personDescriptorId: number;

//     @Field((type) => Person)
//     @OneToOne(() => Person)
//     @JoinColumn()
//     public person: Person;

//     @Field((type) => Image)
//     @OneToOne(() => Image)
//     @JoinColumn()
//     public image: Image;

//     // @Field((type) => PersonDescriptor)
//     // @OneToOne(() => PersonDescriptor)
//     // public personDescriptor: PersonDescriptor;

// }
