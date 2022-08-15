import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddForRental } from '../modules/addForRental';
import { ListResponseModel } from '../modules/ListResponseModel';
import { Rental } from '../modules/rental';
import { ResponseModel } from '../modules/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl ="https://localhost:44384/api/rentals";
  constructor(private httpClient : HttpClient) { }

  getRental():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl+"/getrentaldetails";
     return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  addRental(addForRental:AddForRental){

    let newPath = this.apiUrl+"/add";
    return this.httpClient.post<ResponseModel>(newPath,addForRental)
  }
}
