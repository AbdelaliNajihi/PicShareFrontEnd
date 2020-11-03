import { AfterAuthGuard } from './Guard/after-auth/after-auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { RoleGuard } from './Guard/role/role.guard';
import { StatisticsComponent } from './Components/statistics/statistics.component';
import { AuthGuard } from './Guard/auth/auth.guard';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { AccessdeniedComponent } from './Components/accessdenied/accessdenied.component';
import { HomeComponent } from './Components/home/home.component';
import { NotFound404Component } from './Components/not-found404/not-found404.component';
import { LoginComponent } from './Components/login/login.component';
import { UsersComponent } from './Components/users/users.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path : 'login', component: LoginComponent, canActivate: [AfterAuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard, RoleGuard], data: {expectedRoles: ["ADMIN", "USER"]}},
  {path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard], data: {expectedRoles: ["ADMIN", "USER"]}},
  {path: 'resetpassword', component: ResetPasswordComponent, canActivate: [AfterAuthGuard]},
  {path: '403', component: AccessdeniedComponent},
  {path: '**', component: NotFound404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
