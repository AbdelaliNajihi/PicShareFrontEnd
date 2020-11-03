import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import decode from 'jwt-decode';

import { AuthService } from './../../Services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
              next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

    const expectedRoles = next.data.expectedRoles;
    const token = localStorage.getItem('token');
    //npm install --save jwt-decode  
    const tokenPaylod = decode(token);
    const roles = tokenPaylod.roles.map(role => role.authority);
    if(!this.authService.isAuthenticated() || roles.filter(role => expectedRoles.includes(role)).length === 0){
      this.router.navigateByUrl('/403');
      return false;
    }
    return true;
  }
  
}
