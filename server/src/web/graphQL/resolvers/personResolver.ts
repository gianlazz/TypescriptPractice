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
            return await Person.find();
        } catch (error) {
            console.error(error);
        }
    }

    @Mutation((type) => Int)
    public async newPerson(@Arg("inputPerson") inputPerson: InputPerson): Promise<number> {
        try {
            let newPerson = await Person.create(inputPerson as Person);
            newPerson = await newPerson.save();
            return newPerson.id;
        } catch (error) {
            console.error(error);
            throw(error);
        }
    }

}
