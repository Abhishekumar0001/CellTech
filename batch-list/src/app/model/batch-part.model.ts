export interface Part {
    partName: string;
    price: number;
    removedFromBatch?: number;
    removed?: boolean;
    time?: Date;
}