export type Guitar = {
    id: number;
    userId: string;
    brand: string;
    model: string;
    year: number;
    color: string;
}

export type Query = {
    guitars: Guitar[];
}