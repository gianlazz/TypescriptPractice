export type Guitar = {
    id: number;
    userId: string;
    brand: string;
    model: string;
    year: number;
    color: string;
}

export type PersonsFace = {
    id: number;
    name: string;
    image: string;
    descriptor: number[];
}

export type Query = {
    guitars: Guitar[];
    recognizedFaces: PersonsFace[];
}

export type Mutation = {
    createGuitar: Guitar;
    deleteGuitar: boolean;
    registerPersonsFace: number;
}