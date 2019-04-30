import { Field, Float, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToOne((type) => PersonImage, (personImage) => personImage.personDescriptor)
    public personImageConnection: PersonDescriptor;

    @Field((type) => Float, { nullable: true })
    @Column("decimal", { nullable: true })
    public x: number;

    @Field((type) => Float, { nullable: true })
    @Column("decimal", { nullable: true })
    public y: number;

    @Field((type) => Float, { nullable: true })
    @Column("decimal", { nullable: true })
    public height: number;

    @Field((type) => Float, { nullable: true })
    @Column("decimal", { nullable: true })
    public width: number;

    @Field((type) => Person)
    public async person(): Promise<Person>{
        if (!this.loadedPerson) {
            const personImage = await PersonImage.findOne({ 
                where: { personDescriptorId: this.id },
                relations: ["person"]
            });
            this.loadedPerson = personImage.person;
        }

        return this.loadedPerson;
    };

    private loadedPerson: Person;

    // @Field((type) => Image)
    // @OneToOne((type) => PersonImage, (personImage) => personImage.image)
    // public image: Image;

}
