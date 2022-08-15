import { CarImage } from "./carImage";


export interface CarForDetail{
  id:number;
  brandName:string,
  modelName:string,
  colorName:string,
  description:string,
  images : CarImage[],
  dailyPrice:number,
  modelYear:number,
  findeks:number
}