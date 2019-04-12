import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as faceapi from 'face-api.js';
import { NgForm } from '@angular/forms';
import { interval, Observable, Subscription } from 'rxjs';
import { FaceMatcher, LabeledFaceDescriptors } from 'face-api.js';
import { isNullOrUndefined } from 'util';

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
  public faceMatcher: faceapi.FaceMatcher;
  
  public faceDetectionIsOn: boolean;
  public detectionCounter: Observable<number>;
  public detectionCounterSubscription: Subscription;

  public faceRecognitionIsOn: boolean;
  public recognitionCounter: Observable<number>;
  public recognitionCounterSubscription: Subscription;

  constructor() {
    this.captures = [];
    this.labeledDescriptors = [];

    this.faceDetectionIsOn = false;
    // Create an Observable that will publish a value on an interval
    this.detectionCounter = interval(30);

    this.faceRecognitionIsOn = false;
    this.recognitionCounter = interval(30);
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

  capture() {
    var context = this.canvas.nativeElement.getContext("2d");
    context.drawImage(this.video.nativeElement, 0, 0, 640, 480);

    let image = this.canvas.nativeElement.toDataURL("image/png");
    this.captures.push(image);
  }

  async savePerson(form: NgForm) {
    console.log('Form data: ' + JSON.stringify(form.value));

    const results = await faceapi.detectSingleFace('video').withFaceLandmarks().withFaceDescriptor();
    const name = form.value.name;
    console.log(JSON.stringify(results));

    if (results){
      const labeledDescriptor = new faceapi.LabeledFaceDescriptors(name, [results.descriptor])
      console.log(JSON.stringify(labeledDescriptor));
      this.labeledDescriptors.push(labeledDescriptor);
      console.log('Added to array of labeled descriptors');
      
      // create FaceMatcher with automatically assigned labels
      // from the detection results for the reference image
      this.faceMatcher = new faceapi.FaceMatcher(labeledDescriptor)
    } else {
      alert('Nobody detected.');
    }
  }

  async detect() {
    // Flip face detection on or off
    this.faceDetectionIsOn = !this.faceDetectionIsOn;

    if (this.faceDetectionIsOn) {
      // Subscribe to begin publishing values
      this.detectionCounterSubscription = this.detectionCounter.subscribe(async (n) => {
        const detections = await faceapi.detectAllFaces('video');
        const detectionsForSize = await faceapi.resizeResults(detections, { width: 640, height: 480 });
        const boxesWithText: faceapi.BoxWithText[] = [];

        detectionsForSize.forEach(x => {
          boxesWithText.push(new faceapi.BoxWithText(
            x.box, "unknown"
          ));
        })

        // Clear the canvas
        let context = this.canvas.nativeElement.getContext("2d");
        context.clearRect(0, 0, 640, 480);

        // Draw new results onto a canvas
        await faceapi.drawDetection('canvas', boxesWithText, { withScore: true });
      });
    } else {
      this.detectionCounterSubscription.unsubscribe();

      // Clear the canvas
      let context = this.canvas.nativeElement.getContext("2d");
      context.clearRect(0, 0, 640, 480);
    }
  }

  async recognize() {
    // Flip face recognition on or off
    this.faceRecognitionIsOn = !this.faceRecognitionIsOn;

    if (this.faceRecognitionIsOn) {
      // Subscribe to begin publishing values
      this.recognitionCounterSubscription = this.recognitionCounter.subscribe(async () => {
      const results = await faceapi.detectAllFaces('video').withFaceLandmarks().withFaceDescriptors();
      const detectionsForSize = await faceapi.resizeResults(results, { width: 640, height: 480 });
      const boxesWithText: faceapi.BoxWithText[] = [];
      
      detectionsForSize.forEach(async result => {
        const bestMatch = await this.faceMatcher.findBestMatch(result.descriptor);

        boxesWithText.push(new faceapi.BoxWithText(
          result.detection.box, `${bestMatch.label} ${bestMatch.distance}`
        ));
      });

      // Clear the canvas
      let context = this.canvas.nativeElement.getContext("2d");
      context.clearRect(0, 0, 640, 480);

      // Draw new results onto a canvas
      await faceapi.drawDetection('canvas', boxesWithText, { withScore: true });
      });
    } else {
      this.recognitionCounterSubscription.unsubscribe();

      // Clear the canvas
      let context = this.canvas.nativeElement.getContext("2d");
      context.clearRect(0, 0, 640, 480);
    }
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

    const faceMatcher = new faceapi.FaceMatcher(this.labeledDescriptors);
  }

}
