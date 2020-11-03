import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ResetPasswordService } from './../../Services/reset-password/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitted: boolean = false;
  invalidEmail: boolean = false;
  invalidEmailMsg: string;
  isSent: boolean = false;

  constructor(private formBuilder: FormBuilder, private resetPasswordService: ResetPasswordService,
               private router: Router) { }

  ngOnInit(): void {
    this.resetPasswordFormValidation();
  }

  resetPasswordFormValidation() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.resetPasswordForm.controls;
  }

  resetPassword() {
    this.submitted = true;
    if(this.resetPasswordForm.invalid){
      return;
    }
    this.resetPasswordService.resetPassword(this.resetPasswordForm.get('email').value).subscribe(data=>{
      this.isSent = true;
      setTimeout(() => {this.isSent = false}, 3000);
      setTimeout(() => {this.router.navigateByUrl('/login')}, 5000);
    },
      (err: HttpErrorResponse) =>{
        const errorMessage = err.error;
        if(errorMessage === 'No account for this email, Please verify !'){
          this.invalidEmail = true;
          this.invalidEmailMsg = 'No account for this email, Please verify !';
        }
      }
    );
  }


}
