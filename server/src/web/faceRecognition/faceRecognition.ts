import * as faceapi from "face-api.js";
import { LabeledFaceDescriptors } from "face-api.js";
import { Service } from "typedi";
import { PersonDescriptor } from "../../dal/entity/personDescriptor";
import { canvas, faceDetectionNet } from "./common";
import { RecognitionResult } from "./recognitionResult";

@Service({ global: true })
export class FaceRecognition {

  public recognizablePeople: { [key: number]: PersonDescriptor};
  public labeledDescriptors: LabeledFaceDescriptors[];
  public faceMatcher: faceapi.FaceMatcher;

  public modelsLoaded: Promise<boolean>;
  public loadedPeople: Promise<void>;

  constructor() {
    this.recognizablePeople = [];
    this.labeledDescriptors = [];

    this.modelsLoaded = this.loadModels();
    this.loadedPeople = this.getRecognizedFaces();
  }

  public async getRecognizedFaces() {
    const recognizedFaces = await PersonDescriptor.find();

    await recognizedFaces.forEach(async (result) => {
      const person = await result.person();
      this.recognizablePeople[person.id] = result;

      const descriptor = new Float32Array(result.descriptor);
      const labeledDescriptor = new faceapi.LabeledFaceDescriptors(`${person.id}`, [descriptor]);
      this.labeledDescriptors.push(labeledDescriptor);
      this.faceMatcher = new faceapi.FaceMatcher(this.labeledDescriptors);
    });
  }

  public async recognize(imageUrl: string): Promise<RecognitionResult[]> {
    await this.modelsLoaded;
    if (this.faceMatcher === undefined) {
      await this.getRecognizedFaces();
    }

    const cnvs = await canvas.loadImage(imageUrl);
    const faceapiResults = await faceapi
      .detectAllFaces(cnvs, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks(true)
      .withFaceDescriptors();
    const detectionsForSize = await faceapi.resizeResults(faceapiResults, { width: 640, height: 480 });

    const results: RecognitionResult[] = [];
    for (const detection of detectionsForSize) {
      const result = new RecognitionResult();
      console.log(detection.descriptor);
      result.x = detection.detection.box.x;
      result.y = detection.detection.box.y;
      result.height = detection.detection.box.height;
      result.width = detection.detection.box.width;
      result.descriptor = Array.prototype.slice.call(detection.descriptor);

      let bestMatch: faceapi.FaceMatch;
      if (this.faceMatcher) {
        bestMatch = this.faceMatcher.findBestMatch(detection.descriptor);
        const recognizedPerson = this.recognizablePeople[parseInt(bestMatch.label, 10)];
        const person = await recognizedPerson.person();
        const boxWithText = new faceapi.BoxWithText(
          detection.detection.box, `${person.name} ${bestMatch.distance}`
        );
        result.person = person;

        result.boxWithText = boxWithText;
      } else if (this.faceMatcher && bestMatch.label === "unknown") {
        throw new Error("Unknown person found");
      }

      results.push(result);
    }

    return results;
  }

  public async savePerson(image: string, name: string) {
    const results = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();

    if (results) {
      const labeledDescriptor = new faceapi.LabeledFaceDescriptors(name, [results.descriptor]);
      this.labeledDescriptors.push(labeledDescriptor);
      console.log("Added to array of labeled descriptors");

      this.faceMatcher = new faceapi.FaceMatcher(this.labeledDescriptors);
    } else {
      console.error("Nobody detected.");
    }
  }

  private async loadModels(): Promise<boolean> {
    await faceDetectionNet.loadFromDisk(__dirname + "/../../../../models/");
    // await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/../../../../models/");
    await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/../../../../models/");
    await faceapi.nets.faceLandmark68TinyNet.loadFromDisk(__dirname + "/../../../../models/");
    await faceapi.nets.tinyFaceDetector.loadFromDisk(__dirname + "/../../../../models/");
    return true;
  }

}
