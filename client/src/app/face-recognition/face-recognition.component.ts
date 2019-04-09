import { Component, OnInit } from '@angular/core';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-face-recognition',
  templateUrl: './face-recognition.component.html',
  styleUrls: ['./face-recognition.component.css']
})
export class FaceRecognitionComponent implements OnInit {

  constructor() { }

  async ngOnInit() {
    await faceapi.loadSsdMobilenetv1Model('/models')
// accordingly for the other models:
// await faceapi.loadTinyFaceDetectorModel('/models')
// await faceapi.loadMtcnnModel('/models')
// await faceapi.loadFaceLandmarkModel('/models')
// await faceapi.loadFaceLandmarkTinyModel('/models')
// await faceapi.loadFaceRecognitionModel('/models')
// await faceapi.loadFaceExpressionModel('/models')

    console.log(faceapi.nets)
  }

}
