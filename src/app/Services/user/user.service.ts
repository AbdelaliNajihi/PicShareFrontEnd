import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

import { Constants } from './../../Config/constants/constants';
import { User } from '../../Models/user/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(Constants.getAllUsers);
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(Constants.getUserById+id);
  }

  getLoggedinUser(): Observable<User>{
    return this.http.get<User>(Constants.getLoggedinUser);
  }

  likePost(postId: number){
    return this.http.post(Constants.likePost+postId, postId, { responseType: 'text'});
  }

  dislikePost(postId: number){
    return this.http.post(Constants.dislikePost+postId, postId, { responseType: 'text'});
  }

  getUserByUsername(username: string) :Observable<User>{
    return this.http.get<User>(Constants.getUserByUsername+'?username='+username);
  }

  addRoleToUser(userId: number, name: string){
    return this.http.post(Constants.addRoleToUser+userId, {"name": name}, { responseType: 'text'});
  }

  removeRoleFromUser(userId: number, name: string){
    return this.http.post(Constants.removeRoleFromUser+userId, {"name": name}, { responseType: 'text'});
  }

  deleteUser(userId: number){
    return this.http.put(Constants.deleteUser+userId, userId, { responseType: 'text'});
  }

  countUsers(): Observable<number>{
    return this.http.get<number>(Constants.countUsers);
  }

  countLoggedinUsers(): Observable<number>{
    return this.http.get<number>(Constants.countLoggedinUsers);
  }

  updateUser(fd: FormData, userId: number){
    return this.http.put(Constants.updateUser+userId, fd, {responseType: 'text'});
  }

}
