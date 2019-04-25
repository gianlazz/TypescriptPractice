import * as faceapi from "face-api.js";
import { FaceMatcher, LabeledFaceDescriptors } from "face-api.js";
import gql from "graphql-tag";

import { Mutation, Query } from "../types/types";

export class FaceRecognition {

  public video: ElementRef;

  public preLabledImages: string[];
  public labeledDescriptors: LabeledFaceDescriptors[];
  public faceMatcher: faceapi.FaceMatcher;

  constructor(apollo: Apollo) {
    this.labeledDescriptors = [];
  }

  public async loadModels() {
    await faceapi.loadSsdMobilenetv1Model("/models");
    console.log("Loaded loadSsdMobilenetv1Model");

    await faceapi.loadTinyFaceDetectorModel("/models");
    console.log("Loaded loadTinyFaceDetectorModel");

    await faceapi.loadMtcnnModel("/models");
    console.log("Loaded loadMtcnnModel");

    await faceapi.loadFaceLandmarkModel("/models");
    console.log("Loaded loadFaceLandmarkModel");

    await faceapi.loadFaceLandmarkTinyModel("/models");
    console.log("Loaded loadFaceLandmarkTinyModel");

    await faceapi.loadFaceRecognitionModel("/models");
    console.log("Loaded loadFaceRecognitionModel");

    await faceapi.loadFaceExpressionModel("/models");
    console.log("Loaded loadFaceExpressionModel");

    console.log(faceapi.nets);
  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(async (stream) => {
        this.video.nativeElement.srcObject = stream;
        // this.video.nativeElement.src = window.URL.createObjectURL(stream);
        this.video.nativeElement.play();

        await this.recognize();
      });
    }
  }

  public async savePerson(form: NgForm) {
    console.log("Form data: " + JSON.stringify(form.value));
    const image = this.canvas.nativeElement.toDataURL("image/png");
    const results = await faceapi.detectSingleFace("video").withFaceLandmarks().withFaceDescriptor();
    const name = form.value.name;
    console.log(JSON.stringify(results));

    if (results) {
      const labeledDescriptor = new faceapi.LabeledFaceDescriptors(name, [results.descriptor]);
      console.log(JSON.stringify(labeledDescriptor));
      this.labeledDescriptors.push(labeledDescriptor);
      console.log("Added to array of labeled descriptors");

      // create FaceMatcher with automatically assigned labels
      // from the detection results for the reference image
      this.faceMatcher = new faceapi.FaceMatcher(this.labeledDescriptors);
      await this.registerPersonOnServer(name, image, results.descriptor);
    } else {
      alert("Nobody detected.");
    }
  }

  public async getRecognizedFaces() {
    this._recognizedFacesSubscription = await this._apollo.watchQuery<Query>({
      query: gql`
        query {
          recognizedFaces {
            id
            name
            descriptor
          }
        }
      `
    })
    .valueChanges
    .subscribe(({data}) => {
      console.log(data.recognizedFaces);

      data.recognizedFaces.forEach((result) => {
        const descriptor = new Float32Array(result.descriptor);
        const labeledDescriptor = new faceapi.LabeledFaceDescriptors(result.name, [descriptor]);
        console.log(JSON.stringify(labeledDescriptor));
        this.labeledDescriptors.push(labeledDescriptor);
        console.log("Added to array of labeled descriptors");

        // create FaceMatcher with automatically assigned labels
        // from the detection results for the reference image
        this.faceMatcher = new faceapi.FaceMatcher(this.labeledDescriptors);
      });
    });
  }

  public async registerPersonOnServer(name: string, image: string, descriptor: Float32Array) {

  }

  public async recognize() {

      // Subscribe to begin publishing values
      this.recognitionCounterSubscription = this.recognitionCounter.subscribe(async () => {
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

          // Clear the canvas
          const context = this.canvas.nativeElement.getContext("2d");
          context.clearRect(0, 0, 640, 480);

          // Draw new results onto a canvas
          await faceapi.drawDetection("canvas", boxesWithText);
        });
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
