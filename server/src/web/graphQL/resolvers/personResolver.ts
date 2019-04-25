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
            return await Person.find({ loadEagerRelations: true, relations: ["images"] });
        } catch (error) {
            console.error(error);
        }
    }

    @Mutation((type) => Int)
    public async newPerson(@Arg("inputPerson") inputPerson: InputPerson): Promise<number> {
        try {
            let newPerson = await Person.create(inputPerson as Person);
            newPerson = await newPerson.save();
            console.log("Saved new person");
            inputPerson.images.forEach(async (image) => {
                let personsImage = await Image.create(image as Image);
                personsImage = await personsImage.save();
                console.log(`Saved persons image ${personsImage.id}`);
            });

            return newPerson.id;
        } catch (error) {
            console.error(error);
            throw(error);
        }
    }

}
