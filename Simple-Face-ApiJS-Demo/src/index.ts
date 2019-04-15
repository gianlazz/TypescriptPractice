import * as faceapi from "face-api.js";

export class FaceDemo {

    constructor() {
        this.loadModels();
    }

    private async loadModels() {
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
}
