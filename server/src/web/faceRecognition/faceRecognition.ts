import * as faceapi from "face-api.js";
import { LabeledFaceDescriptors } from "face-api.js";
import { PersonsFace } from "../../dal/entity/personsFace";
import { loadModels } from "./loadModels";
import { Person } from "../../dal/entity/person";
import { RecognitionResult } from "./recognitionResult";

export class FaceRecognition {

  public preLabledImages: string[];
  public labeledDescriptors: LabeledFaceDescriptors[];
  public faceMatcher: faceapi.FaceMatcher;
  public loadModelsPromise: Promise<void>;

  constructor() {
    this.labeledDescriptors = [];
    this.loadModelsPromise = loadModels();
  }

  public async savePerson(image: string, name: string) {
    const results = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();

    if (results) {
      const labeledDescriptor = new faceapi.LabeledFaceDescriptors(name, [results.descriptor]);
      this.labeledDescriptors.push(labeledDescriptor);
      console.log("Added to array of labeled descriptors");

      // create FaceMatcher with automatically assigned labels
      // from the detection results for the reference image
      this.faceMatcher = new faceapi.FaceMatcher(this.labeledDescriptors);
    } else {
      console.error("Nobody detected.");
    }
  }

  public async getRecognizedFaces() {
    const recognizedFaces = await PersonsFace.find();

    recognizedFaces.forEach((result) => {
    const descriptor = new Float32Array(result.descriptor);
    const labeledDescriptor = new faceapi.LabeledFaceDescriptors(result.name, [descriptor]);
    console.log(JSON.stringify(labeledDescriptor));
    this.labeledDescriptors.push(labeledDescriptor);
    console.log("Added to array of labeled descriptors");

    // create FaceMatcher with automatically assigned labels
    // from the detection results for the reference image
    this.faceMatcher = new faceapi.FaceMatcher(this.labeledDescriptors);
    });
  }

  public async recognize(image: string): Promise<RecognitionResult[]> {
    const faceapiResults = await faceapi
      .detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();

    const detectionsForSize = await faceapi.resizeResults(faceapiResults, { width: 640, height: 480 });

    const results: RecognitionResult[] = []; 
    detectionsForSize.forEach(async (detection) => {
        const result = new RecognitionResult();

        const bestMatch = await this.faceMatcher.findBestMatch(detection.descriptor);
        const boxWithText = new faceapi.BoxWithText(
          detection.detection.box, `${bestMatch.label} ${bestMatch.distance}`
          );

        result.person.id = parseInt(bestMatch.label);
        result.descriptor = Array.prototype.slice.call(detection.descriptor);
        result.boxesWithText = boxWithText;
    });

    return results;
  }

}
