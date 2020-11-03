import { Injectable } from '@angular/core';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor() { }

  saveToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    console.clear();
  }

  getToken() {
    localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token !== '' && token !== null) {
      return true;
    } else
      return false;
  }

  retrieveUsernameFromToken(): string {
    const token = localStorage.getItem('token');
    if(token !== undefined && token !== null && token !== ''){
    const tokenPaylod = decode(token);
    const username = tokenPaylod.sub
    return username;
    }
  }

  isActor(role: string): boolean {
    const token = localStorage.getItem('token');
    const tokenPaylod = decode(token);
    const roles = tokenPaylod.roles.map(role => role.authority);
    return !!roles.find(x => x === role);
  }

}
