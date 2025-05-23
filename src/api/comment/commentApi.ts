/*
 * @Author: Dhx
 * @Date: 2025-02-27 20:49:04
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\api\comment\commentApi.ts
 */
import { Page } from '@/api/common/pageType';
import request from '@/utils/request'
import { NewCommentForm } from '@/api/comment/commentType'
export function newComment(form: NewCommentForm, postId: String) {
    return request({
        url: '/comment/newComment',
        data: form,
        params: {
            postId:postId
        },
        method: 'post'
    })
}
export function getRootCommentList(form:Page,postId:String) {
    return request({
        url: '/comment/getRootCommentList',
        data:form,
        params: {
            postId:postId
        },
        method: 'post'
    })
}
export function getCommentInfo(form:String){
    return request({
        url: '/comment/getCommentInfo',
        params: {
            commentId:form
        },
        method: 'get'
    })
}

