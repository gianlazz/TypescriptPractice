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

    @OneToMany((type) => PersonImage, (personImage) => personImage.image)
    public personsConnection: PersonImage[];

    @Field((type) => [Person], { nullable: true })
    public async people(): Promise<Person[]> {
        return this.getThisImagesPersons();
    }

    private async getThisImagesPersons() {
        const people: Person[] = [];
        await PersonImage.find({
            where: { imageId: this.id },
            relations: [ "person" ]
        }).then((result) => {
            result.forEach((personImage) => {
                people.push(personImage.person);
            });
        });

        return people;
    }
}
