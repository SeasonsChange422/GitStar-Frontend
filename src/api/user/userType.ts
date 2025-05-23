/*
 * @Author: Dhx
 * @Date: 2025-02-26 01:56:16
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\api\user\userType.ts
 */
type LoginForm = {
    account:String; // username or email
    password:String
}

type RegisterForm = {
    username:String;
    email:String;
    password:String;
    verifyCode:String;
}

type SendCodeForm = {
    email:String;
}

type User = {
    id:String;
    username:String;
    password:String;
    email:String;
    nickName:String;
    avatar:String;
    description:String;
    isAdmin:Boolean;
    isBan:Boolean;
}

type Developer = {
    id:String;
    username:String;
    password:String;
    email:String;
    nickName:String;
    avatar:String;
    description:String;
    auth:String;
}