import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommentDto } from './../../Dtos/CommentDto/comment-dto';
import { Constants } from './../../Config/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  addComment(dto: CommentDto): Observable<any> {
    return this.http.post(Constants.addComment, dto, { responseType: 'text'});
  }
}
