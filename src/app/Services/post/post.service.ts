import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from './../../Config/constants/constants';
import { Post } from '../../Models/post/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(key: string, page: number): Observable<Post[]> {
    return this.http.get<Post[]>(Constants.getAllPosts + '?key=' + key + '&page=' + page);
  }

  addPost(fd: FormData) {
    return this.http.post(Constants.addPost, fd, { responseType: 'text' });
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete(Constants.deletePost+postId, { responseType: 'text' });
  }

  countPosts(): Observable<number>{
    return this.http.get<number>(Constants.countPosts);
  }

}
