import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import * as faceapi from 'face-api.js';
import { NgForm } from '@angular/forms';
import { interval, Observable, Subscription } from 'rxjs';
import { FaceMatcher, LabeledFaceDescriptors } from 'face-api.js';
import { isNullOrUndefined } from 'util';
import { Apollo } from 'apollo-angular';
import { Query, Mutation } from '../types/types';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-face-recognition',
  templateUrl: './face-recognition.component.html',
  styleUrls: ['./face-recognition.component.css']
})
export class FaceRecognitionComponent implements OnInit, OnDestroy {

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  public captures: Array<any>;

  private _apollo: Apollo;

  private _recognizedFacesSubscription: Subscription;

  public preLabledImages: string[];
  public labeledDescriptors: LabeledFaceDescriptors[];
  public faceMatcher: faceapi.FaceMatcher;
  
  public faceDetectionIsOn: boolean;
  public detectionCounter: Observable<number>;
  public detectionCounterSubscription: Subscription;

  public faceRecognitionIsOn: boolean;
  public recognitionCounter: Observable<number>;
  public recognitionCounterSubscription: Subscription;

  constructor(apollo: Apollo) {
    this._apollo = apollo;
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

    console.log(faceapi.nets);

    await this.getRecognizedFaces();
  }

  ngOnDestroy() {
    this._recognizedFacesSubscription.unsubscribe();
    // this.detectionCounterSubscription.unsubscribe();
    // this.recognitionCounterSubscription.unsubscribe();
  }

  ngAfterViewInit(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(async stream => {
        this.video.nativeElement.srcObject = stream;
        // this.video.nativeElement.src = window.URL.createObjectURL(stream);
        this.video.nativeElement.play();

        await this.recognize();
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
    let image = this.canvas.nativeElement.toDataURL("image/png");
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
      this.faceMatcher = new faceapi.FaceMatcher(this.labeledDescriptors);
      await this.registerPersonOnServer(name, image, results.descriptor)
    } else {
      alert('Nobody detected.');
    }
  }

  async getRecognizedFaces() {
    this._recognizedFacesSubscription = await this._apollo.watchQuery<Query>({
      query: gql`
        query {
          recognizedFaces {
            id
            name
            image
            descriptor
          }
        }
      `
    })
    .valueChanges
    .subscribe(({data}) => {
      console.log(data.recognizedFaces);

      data.recognizedFaces.forEach(result => {
        const descriptor = new Float32Array(result.descriptor);
        const labeledDescriptor = new faceapi.LabeledFaceDescriptors(result.name, [descriptor])
        console.log(JSON.stringify(labeledDescriptor));
        this.labeledDescriptors.push(labeledDescriptor);
        console.log('Added to array of labeled descriptors');
        
        // create FaceMatcher with automatically assigned labels
        // from the detection results for the reference image
        this.faceMatcher = new faceapi.FaceMatcher(this.labeledDescriptors);
      });
    });
  }

  async registerPersonOnServer(name: string, image: string, descriptor: Float32Array) {
    console.log(descriptor);
    console.log(descriptor.toString());
    
    this._apollo.mutate<Mutation>({
      mutation: gql`
        mutation{
            registerPersonsFace(
              name: "${ name }"
              image: "${ image }"
              descriptor: [${ descriptor }]
            )
          }
      `
    }).subscribe(res => {
      console.log(res);
    })
  }

  async recognize() {
    // Flip face recognition on or off
    this.faceRecognitionIsOn = !this.faceRecognitionIsOn;

    if (this.faceRecognitionIsOn) {
      // Subscribe to begin publishing values
      this.recognitionCounterSubscription = this.recognitionCounter.subscribe(async () => {
        const results = await faceapi.detectAllFaces('video', new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
        const detectionsForSize = await faceapi.resizeResults(results, { width: 640, height: 480 });
        let boxesWithText: faceapi.BoxWithText[] = [];
        
        detectionsForSize.forEach(async result => {
          const bestMatch = await this.faceMatcher.findBestMatch(result.descriptor);
          console.log(bestMatch.label)
          boxesWithText.push(new faceapi.BoxWithText(
            result.detection.box, `${bestMatch.label} ${bestMatch.distance}`
          ));
          console.log("boxes with text: " + boxesWithText.length);

          // Clear the canvas
          let context = this.canvas.nativeElement.getContext("2d");
          context.clearRect(0, 0, 640, 480);

          // Draw new results onto a canvas
          await faceapi.drawDetection('canvas', boxesWithText);
        });
        console.log("boxes with text: " + boxesWithText.length);

      });
    } else {
      this.recognitionCounterSubscription.unsubscribe();

      // Clear the canvas
      let context = this.canvas.nativeElement.getContext("2d");
      context.clearRect(0, 0, 640, 480);
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
