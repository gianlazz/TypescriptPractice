import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Image } from "../../../dal/entity/image";
import { Person } from "../../../dal/entity/person";
import { PersonImage } from "../../../dal/entity/personImage";
import { InputPerson } from "./inputTypes/InputPerson";

@Resolver()
export class PersonResolver {

    @Query((type) => [Person])
    public async getAllPersons(): Promise<Person[]> {
        try {
            // const persons = await Person.find({
            //     relations: ["imagesConnection", "imagesConnection.person", "imagesConnection.image" ]
            // });

            const persons = await Person.find();
            // persons.forEach((person) => {
            //     const p = person;
            //     p.images = [];
            //     person.imagesConnection.forEach((conn) => {
            //         p.images.push(conn.image);
            //     });
            // });

            console.log(JSON.stringify(persons, null, 4));
            console.log(await persons[0].images());
            return persons;
        } catch (error) {
            console.error(error);
        }
    }

    @Mutation((type) => Int)
    public async newPerson(@Arg("inputPerson") inputPerson: InputPerson): Promise<number> {
        try {
            const newPerson = await Person.create({ ...inputPerson }).save();

            inputPerson.images.forEach(async (inputImage) => {
                const image = await Image.create(inputImage as Image).save();

                const personImage = await PersonImage.create({
                     imageId: image.id,
                     personId: newPerson.id
                    }).save();
            });

            return newPerson.id;
        } catch (error) {
            console.error(error);
            throw(error);
        }
    }

}
