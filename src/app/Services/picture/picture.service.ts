import { Injectable } from '@angular/core';

import { Constants } from './../../Config/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  
  constructor() { }

  getUserPicture(userId: number) {
    return Constants.getUserPicture+'?userId='+userId;
  }

  getPostPicture(postId: number) {
    return Constants.getPostPicture+'?postId='+postId;
  }
}
