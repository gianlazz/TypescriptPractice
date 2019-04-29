import * as faceapi from "face-api.js";
import { Person } from "../../dal/entity/person";

export class RecognitionResult {

    public person: Person;
    public boxesWithText: faceapi.BoxWithText;
    public descriptor: number[];

}
