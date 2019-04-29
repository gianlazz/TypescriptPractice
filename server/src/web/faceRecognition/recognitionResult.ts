import { Person } from "../../dal/entity/person";
import * as faceapi from "face-api.js";

export class RecognitionResult {

    public person: Person;
    public boxesWithText: faceapi.BoxWithText;
    public descriptor: number[];

}