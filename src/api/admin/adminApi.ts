import request from "@/utils/request";
import {Page} from '@/api/common/pageType'
export function setAdmin(form:String){
    return request({
        url: "/admin/setAdmin",
        params: {
            userId:form
        },
        method: 'post'
    })
}

export function banUser(form:String){
    return request({
        url: "/admin/banUser",
        params: {
            userId:form
        },
        method: 'post'
    })
}

export function delComment(form:String){
    return request({
        url: '/admin/delComment',
        params: {
            commentId:form
        },
        method: 'post'
    })
}

export function delPost(form:String){
    return request({
        url: '/admin/delPost',
        params: {
            postId:form
        },
        method: 'post'
    })
}
export function delRepository(form:String){
    return request({
        url: '/admin/delRepository',
        params: {
            repositoryId:form
        },
        method: 'post'
    })
}
export function delProject(form:String){
    return request({
        url: '/admin/delProject',
        params: {
            projectId:form
        },
        method: 'post'
    })
}
export function delRelease(form:String){
    return request({
        url: '/admin/delRelease',
        params: {
            releaseId:form
        },
        method: 'post'
    })
}
export function getPostList(form:Page){
    return request({
        url: '/admin/getPostList',
        data:form,
        method: 'post'
    })
}

export function getProjectList(form:Page){
    return request({
        url: '/admin/getProjectList',
        data:form,
        method: 'post'
    })
}

export function getRepositoryList(form:Page){
    return request({
        url: '/admin/getRepositoryList',
        data:form,
        method: 'post'
    })
}

export function getReleaseList(form:Page){
    return request({
        url: '/admin/getReleaseList',
        data:form,
        method: 'post'
    })
}
export function getUserList(form:Page){
    return request({
        url: '/admin/getUserList',
        data:form,
        method: 'post'
    })
}