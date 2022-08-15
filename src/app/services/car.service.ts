import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../modules/car';
import { Color } from '../modules/color';
import { ListResponseModel } from '../modules/ListResponseModel';
import { RealCar } from '../modules/realCar';
import { ResponseModel } from '../modules/responseModel';
import { SingleResponseModel } from '../modules/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl ="https://localhost:44384/api/";
  constructor(private httpClient : HttpClient) { }

  getCars() : Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:string):Observable<ListResponseModel<Car>>{
    let newPath  = this.apiUrl + "cars/getcarsbybrandid/?categoryId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByColor(colorName : string) :Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbycolorname/?colorName="+colorName
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarDetailsByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailsbycarid/?carId="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  add(car : Car) : Observable<ResponseModel>{
    let newPath = this.apiUrl +"cars/add";
    return this.httpClient.post<ResponseModel>(newPath, car)
  }
  getCarById(id : number) : Observable<SingleResponseModel<RealCar>>{
    let newPath = this.apiUrl +"cars/getbyid/?carId="+id;
    return this.httpClient.get<SingleResponseModel<RealCar>>(newPath)
  }
  update(realCar : RealCar) : Observable<ResponseModel>{
    let newPath = this.apiUrl +"cars/update";
    return this.httpClient.post<ResponseModel>(newPath, realCar)
  }
  getCarsByFilter(brandId: number, colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcarsbyfilterwithdetails?brandid=' + brandId + "&colorid=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

}
