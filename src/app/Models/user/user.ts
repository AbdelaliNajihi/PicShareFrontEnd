import { Comment } from './../comment/comment';
import { Post } from './../post/post';
import { Role } from './../role/role';

export class User {
    userId: number;
    username: string;
    password: string;
    email: string;
    gender: string;
    birthDate: Date;
    biography: string;
    pictureName: string;
    roles: Array<Role>;
    comments: Array<Comment>;
    posts: Array<Post>;
    likedPosts: Array<Post>;
    dislikedPosts: Array<Post>;
}
