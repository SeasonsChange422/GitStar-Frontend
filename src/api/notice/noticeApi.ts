import request from '@/utils/request'
import { Notice } from '@/api/notice/noticeType'
export function newNotice(form: Notice) {
    return request({
        url: '/admin/newNotice',
        data: form,
        method: 'post'
    })
}

export function getNoticeList(){
    return request({
        url: '/notice/getNoticeList',
        method: 'get'
    })
}

export function delNotice(form:String){
    return request({
        url: '/admin/delNotice',
        data: form,
        method: 'post'
    })
}