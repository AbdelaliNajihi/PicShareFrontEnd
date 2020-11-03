import { Constants } from './../../Config/constants/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  resetPassword(email: string) {
    return this.http.get(Constants.resetpassword+email, {responseType: 'text'});
  }
}
