import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-face-recognition',
  templateUrl: './face-recognition.component.html',
  styleUrls: ['./face-recognition.component.css']
})
export class FaceRecognitionComponent implements OnInit {

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  public captures: Array<any>;

  constructor() {
    this.captures = [];
  }

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

  ngAfterViewInit(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        // this.video.nativeElement.src = window.URL.createObjectURL(stream);
        this.video.nativeElement.play();

        let video = document.getElementById('video');
        video.addEventListener('play', () => {
        //  await process();
        });
      });
    }
  }

  async process() {
    // const input = document.getElementById('myImg');
    const input = document.getElementById('video');
    // const input = document.getElementById('myCanvas');
    // or simply:
    // const input = 'myImg';

    const detections = await faceapi.detectAllFaces('video');
    console.log('Face detection results: ' + JSON.stringify(detections));

    const detectionsForSize = await faceapi.resizeResults(detections, { width: 640, height: 480 });
    // draw them into a canvas
    await faceapi.drawDetection('canvas', detectionsForSize, { withScore: true });
  }

  capture() {
    var context = this.canvas.nativeElement.getContext("2d")
                      .drawImage(this.video.nativeElement, 0, 0, 640, 480);

    let image = this.canvas.nativeElement.toDataURL("image/png");
    this.captures.push(image);
  }

}
