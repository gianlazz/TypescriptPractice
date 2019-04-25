import * as faceapi from "face-api.js";
import { FaceMatcher, LabeledFaceDescriptors } from "face-api.js";
import { loadModels } from "./loadModels";

export class FaceRecognition {

  public video: ElementRef;

  public preLabledImages: string[];
  public labeledDescriptors: LabeledFaceDescriptors[];
  public faceMatcher: faceapi.FaceMatcher;
  public loadModelsPromise: Promise<void>;

  constructor() {
    this.labeledDescriptors = [];
    this.loadModelsPromise = loadModels().;
  }

  public async savePerson(image: string, name: string) {
    const results = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();

    if (results) {
      const labeledDescriptor = new faceapi.LabeledFaceDescriptors(name, [results.descriptor]);
      console.log(JSON.stringify(labeledDescriptor));
      this.labeledDescriptors.push(labeledDescriptor);
      console.log("Added to array of labeled descriptors");

      // create FaceMatcher with automatically assigned labels
      // from the detection results for the reference image
      this.faceMatcher = new faceapi.FaceMatcher(this.labeledDescriptors);
      await this.registerPerson(name, image, results.descriptor);
    } else {
      console.error("Nobody detected.");
    }
  }

  public async getRecognizedFaces() {
    const queryResult: any = [];

    queryResult.recognizedFaces.forEach((result) => {
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

  public async registerPerson(name: string, image: string, descriptor: Float32Array) {
    // Save to database
  }

  public async recognize() {
    const results = await faceapi.detectAllFaces("video", new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
    const detectionsForSize = await faceapi.resizeResults(results, { width: 640, height: 480 });
    const boxesWithText: faceapi.BoxWithText[] = [];

    detectionsForSize.forEach(async (result) => {
        const bestMatch = await this.faceMatcher.findBestMatch(result.descriptor);
        console.log(bestMatch.label);
        boxesWithText.push(new faceapi.BoxWithText(
        result.detection.box, `${bestMatch.label} ${bestMatch.distance}`
        ));
        console.log("boxes with text: " + boxesWithText.length);
    });
  }

  public async detect(image: string) {
        const detections = await faceapi.detectAllFaces(image);
        const detectionsForSize = await faceapi.resizeResults(detections, { width: 640, height: 480 });
        const boxesWithText: faceapi.BoxWithText[] = [];

        detectionsForSize.forEach((x) => {
          boxesWithText.push(new faceapi.BoxWithText(
            x.box, "unknown"
          ));
        });
  }

  public async generateLabeledDescriptors() {
    this.preLabledImages.forEach(async (imagePath) => {
      const imageName = imagePath.split("/").pop();
      const imageDescriptor = await faceapi.detectSingleFace(imagePath).withFaceLandmarks().withFaceDescriptor();

      this.labeledDescriptors.push(new faceapi.LabeledFaceDescriptors(
        imageName,
        [imageDescriptor.descriptor]
      ));
    });

    const faceMatcher = new faceapi.FaceMatcher(this.labeledDescriptors);
  }

}
