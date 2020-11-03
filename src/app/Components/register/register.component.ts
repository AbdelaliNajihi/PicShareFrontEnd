import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash, faUser, faEnvelope, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from './../../Services/user/user.service';
import { RegisterService } from './../../Services/register/register.service';
import { User } from './../../Models/user/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userIcon = faUser; eyeIcon = faEye; eyeSlashIcon = faEyeSlash;
  envelopeIcon = faEnvelope; calendarIcon = faCalendarAlt;
  hide: boolean = true;
  user: User = new User();
  userCheckIcon = faUserCheck;
  selectedFile: File = null;
  picturePreview: any = null;
  usernameExists: boolean = false; emailExists: boolean = false; fileNotUploaded: boolean = false;
  usernameExistsMsg: string; emailExistsMsg: string; fileNotUploadedMsg: string;
  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(private registerService: RegisterService, private router: Router,
              private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerFormValidation();
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.picturePreview = reader.result;
    };
  }

  registerFormValidation() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      birthDate: [''],
      biography: ['']
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('username', this.registerForm.get('username').value);
    formData.append('password', this.registerForm.get('password').value);
    formData.append('email', this.registerForm.get('email').value);
    formData.append('gender', this.registerForm.get('gender').value);
    formData.append('birthDate', this.registerForm.get('birthDate').value);
    formData.append('biography', this.registerForm.get('biography').value);
    this.registerService.register(formData).subscribe(data => {
      this.router.navigateByUrl('/login');
    }, (err: HttpErrorResponse) => {
      const errorMessage = err.error;
      if (errorMessage === 'usernameExists') {
        this.usernameExists = true;
        this.usernameExistsMsg = 'username exists !';
      }
      if (errorMessage === 'emailExists') {
        this.emailExists = true;
        this.emailExistsMsg = 'email exists !';
      }
      if (errorMessage === 'Please select a file !') {
        this.fileNotUploaded = true;
        this.fileNotUploadedMsg = 'Please select a file !';
      }
    });
  }

}
