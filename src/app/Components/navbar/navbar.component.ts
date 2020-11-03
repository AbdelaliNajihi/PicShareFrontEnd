import { Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faUser, faPowerOff, faCameraRetro, faCheck, faHome, faUserCog, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { UserService } from './../../Services/user/user.service';
import { PostService } from './../../Services/post/post.service';
import { AuthService } from './../../Services/auth/auth.service';
import { Post } from './../../Models/post/post';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userIcon = faUser; facebookIcon = faFacebookF; instagramIcon = faInstagram;
  powerOffIcon = faPowerOff; twitterIcon = faTwitter; cameraIcon = faCameraRetro;
  checkIcon = faCheck; homeIcon = faHome; userCogIcon = faUserCog; roleIcon = faUserTag; brandIcon = faCamera;
  selectedFile: File = null;
  post: Post = new Post();
  picturePreview: any = null; 
  showRoute: boolean = true;
  username: string = this.authService.retrieveUsernameFromToken();

  constructor(private authService: AuthService, private postService: PostService, 
              private router: Router,private userService: UserService, 
              private library: FaIconLibrary) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () =>{
      this.picturePreview = reader.result;
    };
  }

  addPost(){
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('title', ""+this.post.title);
    this.postService.addPost(formData).subscribe(res=>{
      window.location.reload();
    });
  }

  isActor(role: string): boolean{
    return this.authService.isActor(role);
  }

}
