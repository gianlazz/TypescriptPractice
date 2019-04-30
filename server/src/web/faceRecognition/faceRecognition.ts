import axios from "axios";
import * as faceapi from "face-api.js";
import { LabeledFaceDescriptors } from "face-api.js";
import { Person } from "../../dal/entity/person";
import { PersonsFace } from "../../dal/entity/personsFace";
import { canvas, faceDetectionNet } from "./common";
import { RecognitionResult } from "./recognitionResult";
import { Service } from "typedi";

@Service()
export class FaceRecognition {

  public preLabledImages: string[];
  public labeledDescriptors: LabeledFaceDescriptors[];
  public faceMatcher: faceapi.FaceMatcher;
  public modelsLoaded: Promise<boolean>;

  constructor() {
    this.labeledDescriptors = [];
    this.modelsLoaded = this.loadModels();
  }

  private async loadModels(): Promise<boolean> {
    await faceDetectionNet.loadFromDisk(__dirname + "/../../../../models/");
    // await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/../../../../models/");
    await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/../../../../models/");
    await faceapi.nets.faceLandmark68TinyNet.loadFromDisk(__dirname + "/../../../../models/");
    await faceapi.nets.tinyFaceDetector.loadFromDisk(__dirname + "/../../../../models/");
    return true;
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

  public async recognize(imageUrl: string): Promise<RecognitionResult[]> {  
    await this.modelsLoaded;  
    // await this.getRecognizedFaces();
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

        // const bestMatch = await this.faceMatcher.findBestMatch(detection.descriptor);
        // const boxWithText = new faceapi.BoxWithText(
        //   detection.detection.box, `${bestMatch.label} ${bestMatch.distance}`
        //   );

        // result.person.id = parseInt(bestMatch.label, );
        result.descriptor = Array.prototype.slice.call(detection.descriptor);
        // result.boxesWithText = boxWithText;
        results.push(result);
    });

    return results;
  }

}
