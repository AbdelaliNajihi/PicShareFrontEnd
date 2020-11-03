import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Constants } from './../../Config/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  constructor(private http: HttpClient) { }

  register(fd: FormData): Observable<any>{
    return this.http.post(Constants.register, fd, { responseType: 'text' });
  }
}
