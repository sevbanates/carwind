import { CarImage } from "./carImage";

export interface Car{

    carId: number;
    brandId: number;
    brandName: string;
    colorId: number;
    colorName: string;
    minFindexScore: number;
    carDescription: string;
    modelYear: number;
    dailyPrice: number;
    description: string;
    carImagePath: CarImage[];
}