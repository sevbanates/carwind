import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginModel } from '../modules/loginModel';
import { RegisterModel } from '../modules/registerModel';
import { SingleResponseModel } from '../modules/singleResponseModel';
import { TokenModel } from '../modules/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44384/api/auth/";
  constructor(private httpClient : HttpClient) { }

  login(user : loginModel){
    let newPath = this.apiUrl + "login"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, user)
  }

  register(registerModel : RegisterModel){
    let newPath = this.apiUrl + "register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, registerModel)
  }
  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true
    }else{
      return false
    }
  }
}
