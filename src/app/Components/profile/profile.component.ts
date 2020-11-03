import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faUser, faEnvelope, faUserCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

import { RoleService } from './../../Services/role/role.service';
import { PostService } from './../../Services/post/post.service';
import { AuthService } from './../../Services/auth/auth.service';
import { PictureService } from './../../Services/picture/picture.service';
import { UserService } from './../../Services/user/user.service';
import { User } from './../../Models/user/user';
import { Role } from 'src/app/Models/role/role';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userIcon = faUser; envelopeIcon = faEnvelope; calendarIcon = faCalendarAlt;
  userCheckIcon = faUserCheck; deleteUserIcon = faTrash;
  username: string;
  user: User = new User();
  loggedUser: User;
  selectedFile: File = null;
  picturePreview: any = null;
  usernameToken: string = this.authService.retrieveUsernameFromToken();

  roles: Role[];

  constructor(private userService: UserService, private route: ActivatedRoute,
              private pictureService: PictureService, private router: Router, 
              private authService: AuthService, private postService: PostService,
              private roleService: RoleService) { }

  ngOnInit(): void {
    this.user = new User();
    this.username = this.route.snapshot.params['username'];
    this.getUserByUsername();
    this.loggedinUser();
  }

  getUserByUsername() {
    this.userService.getUserByUsername(this.username).subscribe(data => {
      this.user = data;
      console.log(data);
    });
  }

  loggedinUser() {
    this.userService.getLoggedinUser().subscribe(data => {
      this.loggedUser = data;
      console.log(data);
    });
  }

  getPostPicture(postId: number) {
    return this.pictureService.getPostPicture(postId);
  }

  getUserPicture(userId: number) {
    return this.pictureService.getUserPicture(userId);
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.picturePreview = reader.result;
    };
  }

  updateUser() {
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('username', "" + this.loggedUser.username);
    formData.append('email', "" + this.loggedUser.email);
    formData.append('gender', "" + this.loggedUser.gender);
    formData.append('birthDate', "" + this.loggedUser.birthDate);
    formData.append('biography', "" + this.loggedUser.biography);
    this.userService.updateUser(formData, this.loggedUser.userId).subscribe(data => {
      //console.log(data);
      window.location.reload();
    });
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(data=>{
      console.log(data);
      window.location.reload();
    });
  }
}
