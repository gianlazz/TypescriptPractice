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
    jsonDescriptor: string;
}

export type Query = {
    guitars: Guitar[];
}

export type Mutation = {
    createGuitar: Guitar;
    deleteGuitar: boolean;
}