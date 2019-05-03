import { addYears, subDays, subYears } from "date-fns";
import * as fs from "fs";
import * as https from "https";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Between } from "typeorm";
import { Image } from "../../../dal/entity/image";
import { Person } from "../../../dal/entity/person";
import { PersonDescriptor } from "../../../dal/entity/personDescriptor";
import { PersonImage } from "../../../dal/entity/personImage";
import { FaceRecognition } from "../../faceRecognition/faceRecognition";
import { InputImage } from "./inputTypes/inputImage";
import { InputPerson } from "./inputTypes/InputPerson";
import { Writable } from "stream";
// var ffmpeg = require("ffmpeg.js");
// var ffmpeg = require("ffmpeg.js/ffmpeg-mp4.js");
var ffmpeg = require("fluent-ffmpeg");
// import * as streamBuffers from "stream-buffers";
import { WritableStreamBuffer, ReadableStreamBuffer } from "stream-buffers";
import { spawn, exec } from "ts-process-promises";


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

    @Query((type) => [PersonImage])
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
            console.error(error);
        }
    }

    @Mutation((type) => Boolean)
    public async watchNewStream(@Arg("url") url: string): Promise<boolean> {
        try {
                // request('https://justadudewhohacks.github.io/face-api.js/media/bbt.mp4').pipe(fs.createWriteStream(__dirname + "video.mp4"));

                // ffmpeg commands
                // Takes screenshot for just the first frame
                // ffmpeg -i https://justadudewhohacks.github.io/face-api.js/media/bbt.mp4 -f image2 -vframes 1 img%03d.jpg

                // Takes screenshot for the first 5 frames
                // ffmpeg -i https://justadudewhohacks.github.io/face-api.js/media/bbt.mp4 -f image2 -vframes 5 img%03d.jpg

                // Takes one screenshot for every 120 frames
                // ffmpeg -i https://justadudewhohacks.github.io/face-api.js/media/bbt.mp4 -f image2 -vf fps=fps=1/120 img%03d.jpg

                // Intends to take screenshot every 10 frames but the output is not formated for naming
                // ffmpeg -y -i https://justadudewhohacks.github.io/face-api.js/media/bbt.mp4 -r 10 -f image2 imageOutput.jpg

                // Takes screenshot every 10 frames
                // ffmpeg -y -i https://justadudewhohacks.github.io/face-api.js/media/bbt.mp4 -r 10 -f image2 img%03d.jpg

                // The following pipes the output from the ffmpeg stream screenshot to catimg
                // catimg <(ffmpeg -i https://justadudewhohacks.github.io/face-api.js/media/bbt.mp4 -f image2 -vframes 1 pipe:1)

                // const readStream = fs.createReadStream("file");
                // const writeStream = fs.createWriteStream("file");

                const ws = new Writable();
                const bufferArray = [];
                ws._write = (chunk, enc, next) => {
                    console.log(chunk.length);
                    bufferArray.push(chunk);
                    next();
                }


                // https.get(url, (res) => {
                //     const writableStreamBuffer = new WritableStreamBuffer();
                //     const readableStreamBuffer = new ReadableStreamBuffer();
                //     res.pipe(ws);

                //     res.pipe(writableStreamBuffer);
                //     writableStreamBuffer.pipe(readableStreamBuffer)
                //     readableStreamBuffer.pipe(writableStreamBuffer);

                //     // ffmpeg()
                //     res.on("end", () => {
                //         console.log(`Finished streaming. WritableStreamBuffer size: ${writableStreamBuffer.size()} ReadableStreamBuffer size: ${readableStreamBuffer.size()}`);
                //     })

                //     ffmpeg(readableStreamBuffer).save("screenshot.png");
                // })
 
                await exec("ffmpeg -i https://justadudewhohacks.github.io/face-api.js/media/bbt.mp4 -f image2 -vframes 1 -")
                    .on('process', (process: any) => console.log('Pid: ', process.pid))
                    .on('stdout', (line: any) => console.log('stdout: ', line))
                    .on('stderr', (line: any) => console.log('stderr: ', line))
                // const cmd = spawn('ffmpeg', ["-i", url, "-f", "image2", "-vframes", "1", "img%03d.jpg"])

                // https.get(url, (res) => {
                //     const videoPath = __dirname + "video.mp4";
                //     const write = fs.createWriteStream(videoPath);
                //     const len = parseInt(res.headers["content-length"], 10);
                //     let cur = 0;
                //     const total = len / 1048576; // 1048576 - bytes in  1Megabyte
                //     console.log("File size: " + len);
                //     res.pipe(write);
                //     res.on("data", (chunk) => {
                //         cur += chunk.length;
                //         console.log("Downloading " + (100.0 * cur / len).toFixed(2) + "% "
                //         + (cur / 1048576).toFixed(2) + " mb\r" + ".<br/> Total size: " + total.toFixed(2) + " mb");
                //         // console.log(bytesDownloaded);
                //     });
                //     // res.on("end", () => {
                //     //     ffmpeg(fs.createReadStream(videoPath))
                //     //     .save("screenshot.png")
                //     //     .on("end", () => {
                //     //       console.log("Screenshots taken");
                //     //     })
                //     //     .on("error", (err: any) => {
                //     //       console.error(err);
                //     //     });
                //     //     // .screenshots({
                //     //     //   // Will take screenshots at 20%, 40%, 60% and 80% of the video
                //     //     //   timestamps: [0],
                //     //     //   folder: __dirname
                //     //     // });
                //     // });
                //     res.on("end", () => {
                //         ffmpeg(fs.createReadStream(videoPath))
                //         .output("screenshot.png")
                //         .noAudio()
                //         .seek('0:01')
                //         .on("end", () => {
                //           console.log("Screenshots taken");
                //         })
                //         .on("error", (err: any, stdout: any, stderr: any) => {
                //           console.error('An error occurred: ' + err.message, err, stderr);
                //         })
                //         .run();

                //         // .screenshots({
                //         //   // Will take screenshots at 20%, 40%, 60% and 80% of the video
                //         //   timestamps: [0],
                //         //   folder: __dirname
                //         // });
                //     })
                // });

                // var stdout = "";
                // var stderr = "";
                // ffmpeg({
                //     mounts: [{type: "NODEFS", opts: {root: "."}, mountpoint: "/data"}],
                //     arguments: ["-i", "http://justadudewhohacks.github.io/face-api.js/media/bbt.mp4", "-f", "image2", "-vframes", "1", "/data/img%03d.jpg"],
                //     print: function(data: any) { stdout += data + "\n"; },
                //     printErr: function(data: any) { stderr += data + "\n"; },
                //     onExit: function(code: any) {
                //         console.log("Process exited with code " + code);
                //         console.log(stdout);
                //         console.error(stderr);
                //     },
                // });


            // await this.faceService.recognizeVideo(url);
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
