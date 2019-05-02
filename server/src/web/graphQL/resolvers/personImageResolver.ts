import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Image } from "../../../dal/entity/image";
import { Person } from "../../../dal/entity/person";
import { PersonDescriptor } from "../../../dal/entity/personDescriptor";
import { PersonImage } from "../../../dal/entity/personImage";
import { FaceRecognition } from "../../faceRecognition/faceRecognition";
import { InputImage } from "./inputTypes/inputImage";
import { InputPerson } from "./inputTypes/InputPerson";
import { Between } from "typeorm";
import { addYears, subYears, subDays } from 'date-fns';
import * as fs from "fs";
import { httpRequestRouter } from "@tensorflow/tfjs-core/dist/io/browser_http";
import { request } from "http";

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

    @Query(type => [PersonImage])
    public async personImageThisWeek(): Promise<PersonImage[]> {
        try {
            const now = {};
            const aWeekAgo = {};

            const AfterDate = (date: Date) => Between(date, addYears(date, 100));
            const BeforeDate = (date: Date) => Between(subYears(date, 100), date);

            // // leter
            //     return Event.find({
            //     where: {
            //         date: AfterDate(new Date()),
            //     },
            //     });
            const results = await PersonImage.find({
                where: { 
                    timestamp: AfterDate(subDays(Date.now(), 7)),
                },
                relations: [
                    "person",
                    "image",
                    "descriptor"
                ]
            });
            return results;
            
        } catch (error) {
            
        }
    }

    @Mutation(type => Boolean)
    public async watchNewStream(@Arg("url") url: string): Promise<boolean> {
        try {
            await this.faceService.recognizeVideo(url);
        } catch (error) {
            console.error(error);
        }
        return false;
    }

    @Mutation((type) => Boolean)
    public async renamePerson(@Arg("personId") personId: number, @Arg("newName") newName: string): Promise<boolean> {
        try {
            const person = await Person.findOne({ where: { id: personId }});
            if (!person) {
                return false;
            } else {
                person.name = newName;
                await person.save();
                return true;
            }
        } catch (error) {
            console.error(error);
        }
    }

    @Mutation((type) => Int)
    public async newPerson(@Arg("inputPerson") inputPerson: InputPerson): Promise<number> {
        try {
            const recognitionResults = await this.faceService.recognize(inputPerson.image);
            if (recognitionResults.length > 1) {
                throw new Error("Persons image must only contain that person.");
            } else if (recognitionResults.length === 0) {
                throw new Error("No person found in the image.");
            }
            if (recognitionResults[0].person !== undefined) {
                throw new Error("Person recognized as being already in database.");
            }
            const newPerson = await Person.create({ name: inputPerson.name }).save();
            const newImage = await Image.create({ image: inputPerson.image }).save();

            const newDescriptor = new PersonDescriptor();
            newDescriptor.descriptor = recognitionResults[0].descriptor;
            newDescriptor.x = recognitionResults[0].x;
            newDescriptor.y = recognitionResults[0].y;
            newDescriptor.height = recognitionResults[0].height;
            newDescriptor.width = recognitionResults[0].width;
            await newDescriptor.save();

            const newPersonImage = await PersonImage.create({
                personId: newPerson.id,
                imageId: newImage.id,
                personDescriptorId: newDescriptor.id
            }).save();

            return newPerson.id;
        } catch (error) {
            console.error(error);
            throw (error);
        }

        return 0;
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
