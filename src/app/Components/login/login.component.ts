import { AuthService } from './../../Services/auth/auth.service';
import { Router } from '@angular/router';
import { LoginService } from './../../Services/login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFailed: boolean = false;
  message: string;

  constructor(private loginService: LoginService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(res){
    this.loginService.login(res).subscribe(data=>{
      const token = data.headers.get('Authorization');
      this.authService.saveToken(token);
      this.router.navigateByUrl('/home');
    },
    error =>{
      this.loginFailed = true;
      this.message = /* error.message ||  */'Incorrect username and password , try again...';
    });
  }


}
