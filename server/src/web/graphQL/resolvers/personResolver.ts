import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Image } from "../../../dal/entity/image";
import { Person } from "../../../dal/entity/person";
import { InputPerson } from "./inputTypes/InputPerson";

@Resolver()
export class PersonResolver {

    @Query((type) => [Person])
    public async getAllPersons(): Promise<Person[]> {
        try {
            const persons = await Person.find();
            console.log(JSON.stringify(persons, null, 4));
            return persons;
        } catch (error) {
            console.error(error);
        }
    }

    @Mutation((type) => Int)
    public async newPerson(@Arg("inputPerson") inputPerson: InputPerson): Promise<number> {
        try {
            const newPerson = await Person.save(inputPerson as Person);
            newPerson.images = [];
            inputPerson.images.forEach(async (inputImage) => {
                const image = await Image.create(inputImage as Image);
                image.persons.push(newPerson);
                image.save();
            });

            return newPerson.id;
        } catch (error) {
            console.error(error);
            throw(error);
        }
    }

}
