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

    private faceService: FaceRecognition;

    constructor(faceService: FaceRecognition) {
        this.faceService = faceService;
    }

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

            for (const inputImage of inputPerson.images) {
                const image = await Image.create({ ...inputImage }).save();

                const personImage = await PersonImage.create({
                     imageId: image.id,
                     personId: newPerson.id
                    }).save();
            }

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

            if (inputImage.personDescriptors) {
                for (const inputPersonDescriptor of inputImage.personDescriptors) {
                    const person = await Person.create({ ...inputPersonDescriptor.person }).save();

                    let newDescriptor = new PersonDescriptor();
                    newDescriptor.descriptor = inputPersonDescriptor.descriptor;
                    newDescriptor = await PersonDescriptor.create(newDescriptor).save();

                    const personImage = await PersonImage.create({
                        personId: person.id,
                        imageId: newImage.id,
                        personDescriptorId: newDescriptor.id
                    }).save();
                }
            } else if (!inputImage.personDescriptors) {
                // Perform face recognition and update/save to de-normalized object to db
                const recognitionResults = await this.faceService.recognize(inputImage.image);

                for (const result of recognitionResults) {
                    // Check the result before just saving a blank person!
                    let person: Person;
                    if (result.person !== undefined) {
                        person = result.person;
                    } else {
                        person = await Person.create(result.person).save();
                    }

                    let descriptor = new PersonDescriptor();
                    descriptor.descriptor = result.descriptor;
                    descriptor.x = result.x;
                    descriptor.y = result.y;
                    descriptor.height = result.height;
                    descriptor.width = result.width;

                    descriptor = await PersonDescriptor.create(descriptor).save();

                    const personImage = await PersonImage.create({
                        personId: person.id,
                        imageId: newImage.id,
                        personDescriptorId: descriptor.id
                    }).save();
                }

                return newImage.id;
            } else {
                throw new Error(("Input not in a valid state"));
            }

        } catch (error) {
            console.error(error);
        }
        return 0;
    }

}
