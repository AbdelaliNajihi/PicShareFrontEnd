import { User } from './../../Models/user/user';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, Output } from '@angular/core';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faComment, faArrowAltCircleDown, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

import { CommentDto } from './../../Dtos/CommentDto/comment-dto';
import { CommentService } from './../../Services/comment/comment.service';
import { PictureService } from './../../Services/picture/picture.service';
import { UserService } from './../../Services/user/user.service';
import { Post } from './../../Models/post/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  commentDto: CommentDto = new CommentDto();
  thumbsDown = faThumbsDown;
  commentIcon = faComment;
  showcomments = faArrowAltCircleDown;
  commentInput: boolean = false;
  commentList: boolean = false;
  typeCommentIcon = faChevronCircleRight;
  isLiked: boolean = false;
  isDisliked: boolean = false;
  
  @Input('p') p: Post;
  userApp: User;
  
  constructor(private userService: UserService, private pictureService: PictureService,
              private commentService: CommentService, library: FaIconLibrary) {
              library.addIcons(farHeart);
    }

  ngOnInit(): void {
    this.getLoggedinUser();
  }

  getPostPicture(postId: number) {
    return this.pictureService.getPostPicture(postId);
  }

  getUserPicture(userId: number) {
    return this.pictureService.getUserPicture(userId);
  }

  likePost(postId) {
    this.isLiked = true;
    setTimeout(() => { this.isLiked = false }, 3000);
    this.userService.likePost(postId).subscribe(res => {
      console.log(res);
    });
  }

  dislikePost(postId) {
    this.isDisliked = true;
    setTimeout(() => { this.isDisliked = false }, 3000);
    this.userService.dislikePost(postId).subscribe(res => {
      console.log(res);
    });
  }

  getLoggedinUser() {
    this.userService.getLoggedinUser().subscribe(data => {
      this.userApp = data;
    });
  }

  showCommentInput() {
    this.commentInput = !this.commentInput;
    console.log('showCommentsInput !');
  }

  showCommentsList() {
    this.commentList = !this.commentList;
    console.log('showCommentsList !');
  }

  addComment(commentForm: NgForm, postId: number) {
    this.commentDto.postId = commentForm.value.postId;
    this.commentService.addComment(this.commentDto).subscribe(data => {
      console.log(data);
      commentForm.reset();
    });
  }
  
}
