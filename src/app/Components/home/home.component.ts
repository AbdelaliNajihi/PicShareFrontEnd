import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faImages, faUsers} from '@fortawesome/free-solid-svg-icons'

import { PictureService } from './../../Services/picture/picture.service';
import { PostService } from './../../Services/post/post.service';
import { UserService } from './../../Services/user/user.service';
import { Post } from './../../Models/post/post';
import { User } from './../../Models/user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userApp: User;
  posts: Post[];
  key: string = '';
  page: number = 0;
  pages: Array<number>;
  pageNumber: number;
  totalPages: number
  imagesIcon = faImages;
  loggedinUsers: number;
  usersIcon = faUsers;

  constructor(private userService: UserService, private postService: PostService, 
              private router: Router, private pictureService: PictureService, ) {}

  ngOnInit(): void {
    this.getLoggedinUser();
    this.getPosts();
    this.countLoggedinUsers();
  }

  getLoggedinUser() {
    this.userService.getLoggedinUser().subscribe(data => {
      this.userApp = data;
      console.log(data);
    });
  }

  getPosts() {
    this.postService.getAllPosts(this.key, this.page).subscribe(data => {
      this.posts = data['content'];
      this.pages = new Array(data['totalPages']);
      this.pageNumber = data['pageable'].pageNumber;
      this.totalPages = data['totalPages']
    });
  }

  setPages(i, event) {
    event.preventDefault();
    this.page = i;
    this.getPosts();
  }

  previousPage(event) {
    event.preventDefault();
    if((this.page === 0) && (this.pageNumber === 0)){
      console.log('Previous ', this.page = this.pageNumber);
      return;
    }else
    this.page = (this.pageNumber - 1);
    this.getPosts();
  }

  nextPage(event) {
    event.preventDefault();
    if((this.page === (this.totalPages - 1)) && (this.pageNumber === (this.totalPages -1))){
      console.log('Next ', this.pageNumber = this.page);
      return;
    }else
    this.page = (this.pageNumber + 1);
    this.getPosts();
  }

  firstPage(event) {
    event.preventDefault();
    this.page = 0;
    this.getPosts();
  }

  lastPage(event) {
    event.preventDefault();
    this.page = (this.totalPages - 1);
    this.getPosts();
  }

  countLoggedinUsers() {
    this.userService.countLoggedinUsers().subscribe(data => {
      this.loggedinUsers = data;
      console.log('loggedinUsers =', data);
    })
  }

  getUserPicture(userId: number) {
    return this.pictureService.getUserPicture(userId);
  }

}
