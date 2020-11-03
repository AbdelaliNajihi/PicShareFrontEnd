import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PostDetailsComponent } from './Components/post-details/post-details.component';
import { StatisticsComponent } from './Components/statistics/statistics.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AccessdeniedComponent } from './Components/accessdenied/accessdenied.component';
import { HomeComponent } from './Components/home/home.component';
import { UsersComponent } from './Components/users/users.component';
import { LoginComponent } from './Components/login/login.component';
import { Interceptor } from './Interceptors/auth/auth-http-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFound404Component } from './Components/not-found404/not-found404.component';
import { PrimengModule } from './Modules/primeng/primeng.module';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFound404Component,
    UsersComponent,
    HomeComponent,
    AccessdeniedComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    ProfileComponent,
    StatisticsComponent,
    PostDetailsComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PrimengModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:Interceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
