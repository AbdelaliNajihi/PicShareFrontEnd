import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Constants } from './../../Config/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(res){
    return this.http.post(Constants.login, res, {observe: 'response'});
  }

}
