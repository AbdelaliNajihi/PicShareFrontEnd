export class Constants {
    //User service
    public static getAllUsers = 'http://localhost:8080/users';
    public static getUserById = 'http://localhost:8080/users/';
    public static getLoggedinUser = 'http://localhost:8080/users/loggedin';
    public static likePost = 'http://localhost:8080/users/like/';
    public static dislikePost = 'http://localhost:8080/users/dislike/';
    public static getUserByUsername = 'http://localhost:8080/users/username';
    public static addRoleToUser = 'http://localhost:8080/users/addRole/';
    public static removeRoleFromUser = 'http://localhost:8080/users/removeRole/';
    public static deleteUser = 'http://localhost:8080/users/delete/';
    public static updateUser = 'http://localhost:8080/users/update/';
    public static countUsers = 'http://localhost:8080/users/count';
    public static countLoggedinUsers = 'http://localhost:8080/users/loggedin/count';

    //Role Service
    public static getAllRoles = 'http://localhost:8080/roles';

    //Register Service
    public static register = 'http://localhost:8080/register';

    //Post Service
    public static getAllPosts = 'http://localhost:8080/posts';
    public static addPost = 'http://localhost:8080/posts/new';
    public static deletePost = 'http://localhost:8080/posts/';
    public static countPosts = 'http://localhost:8080/posts/count';

    //Picture Service
    public static getUserPicture = 'http://localhost:8080/pictures/user';
    public static getPostPicture = 'http://localhost:8080/pictures/post';

    //Login Service
    public static login = 'http://localhost:8080/authentication';

    //Comment Service
    public static addComment = 'http://localhost:8080/comments/new';

    //Reset Password Service
    public static resetpassword = 'http://localhost:8080/resetpassword/';
}
