import { IEuclideanDistance } from "./interfaces/IEuclideanDistance";

export class VisionCoordinator {

    private _euclideanDistance: IEuclideanDistance;
    private samenessThreshold: number;
     
    constructor(euclideanDistance: IEuclideanDistance) {
        this._euclideanDistance = euclideanDistance;
        this.samenessThreshold = 0.5;
    }

    public processFrame() {

    }
}