/*
 * @Author: Dhx
 * @Date: 2025-05-11 11:58:35
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\api\feedback\feedbackApi.ts
 */
import request from '@/utils/request'
import{ Feedback,NewFeedbackForm} from '@/api/feedback/feedbackType'
export function newFeedback(form: NewFeedbackForm) {
    return request({
        url: '/feedback/newFeedback',
        data: form,
        method: 'post'
    })
}
export function readFeedback(form: String) {
    return request({
        url: '/feedback/readFeedback',
        params: {
            feedbackId:form
        },
        method: 'post'
    })
}
export function getFeedbackList() {
    return request({
        url: '/feedback/getFeedbackList',
        method: 'get'
    })
}
export function getFeebackListByType(form:String) {
    return request({
        url: '/feedback/getFeedbackListByType',
        params: {
            type:form
        },
        method: 'get'
    })
}