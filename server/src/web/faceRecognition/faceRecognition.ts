import * as faceapi from "face-api.js";
import { LabeledFaceDescriptors } from "face-api.js";
import { Service } from "typedi";
import { PersonDescriptor } from "../../dal/entity/personDescriptor";
import { canvas, faceDetectionNet } from "./common";
import { RecognitionResult } from "./recognitionResult";

@Service()
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

    recognizedFaces.forEach(async (result) => {
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
    await this.loadedPeople;

    const cnvs = await canvas.loadImage(imageUrl);
    const faceapiResults = await faceapi
      .detectAllFaces(cnvs, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks(true)
      .withFaceDescriptors();
    const detectionsForSize = await faceapi.resizeResults(faceapiResults, { width: 640, height: 480 });

    const results: RecognitionResult[] = [];
    detectionsForSize.forEach(async (detection) => {
        const result = new RecognitionResult();
        console.log(detection.descriptor);

        let bestMatch: faceapi.FaceMatch; 
        if (this.faceMatcher) {
          bestMatch = await this.faceMatcher!.findBestMatch(detection.descriptor);
          const recognizedPerson = this.recognizablePeople[parseInt(bestMatch.label)];
          const person = await recognizedPerson.person();
          const boxWithText = new faceapi.BoxWithText(
            detection.detection.box, `${person.name} ${bestMatch.distance}`
          );

          result.boxWithText = boxWithText;
        }
        else if (this.faceMatcher && bestMatch.label === "unknown") {
          throw new Error("Unknown person found")
        } else {

        }
        
        // result.person.id = parseInt(bestMatch.label, );
        result.descriptor = Array.prototype.slice.call(detection.descriptor);
        results.push(result);
    });

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
