/*
 * @Author: Dhx
 * @Date: 2025-02-26 01:55:20
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\api\user\userApi.ts
 */
import request from "@/utils/request";
import {LoginForm,RegisterForm,SendCodeForm} from '@/api/user/userType'
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

export function sendCode(form:String){
    return request({
        url: "/user/sendVerifyCode",
        params: {
            email:form
        },
        method: 'get'
    })
}

export function getUserInfo(){
    return request({
        url: "/user/getUserInfo",
        method: 'get'
    })
}
export function updateUserInfo(form) {
    return request({
        url: "/user/updateUserInfo",
        data: form,
        method: 'post'
    })
}

export function getUserById(form:String){
    return request({
        url: "/user/getUserById",
        params: {
            userId:form
        },
        method: 'get'
    })
}
