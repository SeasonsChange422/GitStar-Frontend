import { Page } from '@/api/common/pageType';
import request from '@/utils/request'
import {NewPostForm,DelPostForm} from '@/api/post/postType'
export function newPost(form:NewPostForm) {
    return request({
        url: '/post/newPost',
        data: form,
        method: 'post'
    })
}
export function getPostInfo(form:String) {
    return request({
        url: '/post/getPostInfo',
        params: {
            postId: form
        },
        method:'get'
    })
}
export function delPost(form:DelPostForm) {
    return request({
        url: '/post/delPost',
        data: form,
        method: 'post'
    })
}
export function getPostListByToken(form:Page){
    return request({
        url: '/post/getPostListByToken',
        data: form,
        method: 'post'
    })
}
export function getAuthor(form:String) {
    return request({
        url: '/post/getAuthor',
        params: {
            postId:form
        },
        method: 'get'
    })
}
export function getProjectOfPost(form:String) {
    return request({
        url: '/post/getProjectOfPost',
        params: {
            postId:form
        },
        method: 'get'
    })
}
export function getPostList(form:Page){ 
    return request({
        url: '/post/getPostList',
        data:form,
        method: 'post'
    })
}
export function searchPost(form:String){
    return request({
        url: '/post/searchPost',
        params: {
            key: form
        },
        method: 'get'
    })
}