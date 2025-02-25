/*
 * @Author: Dhx
 * @Date: 2025-02-26 01:55:20
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\api\user\userApi.ts
 */
import request from "../../utils/request";
export function login(form:LoginForm){
    return request({
        url: "/user/login",
        data: form,
        method: 'post'
    })
}

export function register(form:RegisterForm){
    return request({
        url: "/user/register",
        data: form,
        method: 'post'
    })
}

export function sendCode(form:SendCodeForm){
    return request({
        url: "/user/sendVerifyCode",
        data: form,
        method: 'post'
    })
}

export function getUserInfo(){
    return request({
        url: "/user/getUserInfo",
        method: 'get'
    })
}

