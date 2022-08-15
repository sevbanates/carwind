import { getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../modules/color';
import { ListResponseModel } from '../modules/ListResponseModel';
import { ResponseModel } from '../modules/responseModel';
import { SingleResponseModel } from '../modules/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl ="https://localhost:44384/api/";
  constructor(private httpClient : HttpClient) { }

  getColors() : Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl + "colors/getall"
   return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }
  add(color : Color) : Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/add"
    return this.httpClient.post<ResponseModel>(newPath, color)
  }
  getColorById(id : number):Observable<SingleResponseModel<Color>>{
    let newPath = this.apiUrl + "colors/getbyid/?id="+id
    return this.httpClient.get<SingleResponseModel<Color>>(newPath)
  }
  update(color : Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/update"
    return this.httpClient.post<ResponseModel>(newPath, color)
  }
}


