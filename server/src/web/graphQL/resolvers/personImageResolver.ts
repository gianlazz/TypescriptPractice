import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Image } from "../../../dal/entity/image";
import { Person } from "../../../dal/entity/person";
import { PersonDescriptor } from "../../../dal/entity/personDescriptor";
import { PersonImage } from "../../../dal/entity/personImage";
import { FaceRecognition } from "../../faceRecognition/faceRecognition";
import { InputImage } from "./inputTypes/inputImage";
import { InputPerson } from "./inputTypes/InputPerson";

@Resolver()
export class PersonImageResolver {

    @Query((type) => [Person])
    public async getAllPersons(): Promise<Person[]> {
        try {
            return await Person.find();
        } catch (error) {
            console.error(error);
        }
    }

    @Query((type) => [Image])
    public async getAllImages(): Promise<Image[]> {
        try {
            return await Image.find();
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

    @Mutation((type) => Int)
    public async newImage(@Arg("inputImage") inputImage: InputImage): Promise<number> {
        try {
            const newImage = await Image.create({ ...inputImage }).save();

            if (inputImage.persons) {
                // Persons are already populated so just de-normalize into db
                inputImage.persons.forEach(async (inputPerson) => {
                    const newPerson = await Person.create({ ...inputPerson }).save();

                    const personImage = await PersonImage.create({
                        person: newPerson,
                        image: newImage,
                        personDescriptorId: null
                    }).save();
                });
            } else if (!inputImage.persons) {
                // // Perform face recognition and update/save to de-normalized object to db
                // const rec = new FaceRecognition();
                // const recognizedPeople = rec.recognize(inputImage.image);

                // recognizedPeople!.forEach(async personResult => {

                //     const personImage = await PersonImage.create({
                //         person: personResult.person,
                //         image: newImage,
                //         personDescriptor: personResult.descriptor
                //     });
                // });
            } else {
                throw new Error(("Input not in a valid state"));
            }

            return newImage.id;
        } catch (error) {
            console.error(error);
        }
    }

}
