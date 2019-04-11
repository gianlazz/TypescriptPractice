import { IPerson } from "./IPerson";

export interface IEuclideanDistance {

    isMatch(personA: IPerson, personB: IPerson, threshold: number): boolean;

}