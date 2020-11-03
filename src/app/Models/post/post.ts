import { User } from './../user/user';
import { Comment } from '../comment/comment';

export class Post {
    postId: number;
    title: string;
    postName: string;
    postedDate: Date;
    likes: number;
    userApp: User;
    comments: Array<Comment>
}
