import { User } from './../user/user';
import { Post } from './../post/post';

export class Comment {
    commentId: number;
    content: string;
    commentDate: Date;
    post: Post;
    userApp: User;
}
