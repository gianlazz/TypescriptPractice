"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const faceapi = require("face-api.js");
class FaceDemo {
    constructor() {
        this.loadModels();
    }
    loadModels() {
        return __awaiter(this, void 0, void 0, function* () {
            yield faceapi.loadSsdMobilenetv1Model("/models");
            console.log("Loaded loadSsdMobilenetv1Model");
            yield faceapi.loadTinyFaceDetectorModel("/models");
            console.log("Loaded loadTinyFaceDetectorModel");
            yield faceapi.loadMtcnnModel("/models");
            console.log("Loaded loadMtcnnModel");
            yield faceapi.loadFaceLandmarkModel("/models");
            console.log("Loaded loadFaceLandmarkModel");
            yield faceapi.loadFaceLandmarkTinyModel("/models");
            console.log("Loaded loadFaceLandmarkTinyModel");
            yield faceapi.loadFaceRecognitionModel("/models");
            console.log("Loaded loadFaceRecognitionModel");
            yield faceapi.loadFaceExpressionModel("/models");
            console.log("Loaded loadFaceExpressionModel");
            console.log(faceapi.nets);
        });
    }
}
exports.FaceDemo = FaceDemo;
//# sourceMappingURL=index.js.map