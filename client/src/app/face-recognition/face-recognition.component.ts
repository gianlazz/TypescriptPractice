import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as faceapi from 'face-api.js';

import { interval } from 'rxjs';
import { FaceMatcher, LabeledFaceDescriptors } from 'face-api.js';

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

  public preLabledImages: string[];
  public labeledDescriptors: LabeledFaceDescriptors[];

  constructor() {
    this.captures = [];
  }

  async ngOnInit() {
    await faceapi.loadSsdMobilenetv1Model('/models');
    console.log('Loaded loadSsdMobilenetv1Model');

    await faceapi.loadTinyFaceDetectorModel('/models');
    console.log('Loaded loadTinyFaceDetectorModel');

    await faceapi.loadMtcnnModel('/models');
    console.log('Loaded loadMtcnnModel');

    await faceapi.loadFaceLandmarkModel('/models');
    console.log('Loaded loadFaceLandmarkModel');

    await faceapi.loadFaceLandmarkTinyModel('/models');
    console.log('Loaded loadFaceLandmarkTinyModel');

    await faceapi.loadFaceRecognitionModel('/models');
    console.log('Loaded loadFaceRecognitionModel');

    await faceapi.loadFaceExpressionModel('/models');
    console.log('Loaded loadFaceExpressionModel');

    console.log(faceapi.nets)
  }

  ngAfterViewInit(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        // this.video.nativeElement.src = window.URL.createObjectURL(stream);
        this.video.nativeElement.play();
      });
    }
  }

  async detect() {
    // Create an Observable that will publish a value on an interval
    const secondsCounter = interval(30);

    // Subscribe to begin publishing values
    secondsCounter.subscribe(async (n) => {
      const detections = await faceapi.detectAllFaces('video');
      const detectionsForSize = await faceapi.resizeResults(detections, { width: 640, height: 480 });

      // Clear the canvas
      let context = this.canvas.nativeElement.getContext("2d");
      context.clearRect(0, 0, 640, 480);

      // Draw new results onto a canvas
      await faceapi.drawDetection('canvas', detectionsForSize, { withScore: true });
    });
  }

  async generateLabeledDescriptors() {
    this.preLabledImages.forEach(async imagePath => {
      const imageName = imagePath.split('/').pop();
      const imageDescriptor = await faceapi.detectSingleFace(imagePath).withFaceLandmarks().withFaceDescriptor();

      this.labeledDescriptors.push(new faceapi.LabeledFaceDescriptors(
        imageName,
        [imageDescriptor.descriptor]
      ));
    });

    // this.labeledDescriptors.push(new faceapi.LabeledFaceDescriptors(
    //   'obama',
    //   [descriptorObama1, descriptorObama2]
    // ));
    // this.labeledDescriptors.push(new faceapi.LabeledFaceDescriptors(
    //   'trump',
    //   [descriptorTrump]
    // ));

    const faceMatcher = new faceapi.FaceMatcher(this.labeledDescriptors);
  }

  async recognize() {
    // Create an Observable that will publish a value on an interval
    const secondsCounter = interval(100);

    // Subscribe to begin publishing values
    secondsCounter.subscribe(async () => {
      // Clear the canvas
      let context = this.canvas.nativeElement.getContext("2d");

      const results = await faceapi.detectAllFaces('video').withFaceLandmarks().withFaceDescriptors();

      // create FaceMatcher with automatically assigned labels
      // from the detection results for the reference image
      const faceMatcher = new faceapi.FaceMatcher(results);
      
      results.forEach(fd => {
        const bestMatch = faceMatcher.findBestMatch(fd.descriptor);
        console.log(JSON.stringify(bestMatch)) ;
      })
    })
  }

  capture() {
    var context = this.canvas.nativeElement.getContext("2d");
    context.drawImage(this.video.nativeElement, 0, 0, 640, 480);

    let image = this.canvas.nativeElement.toDataURL("image/png");
    this.captures.push(image);
  }

}
