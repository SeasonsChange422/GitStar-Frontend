import request from '@/utils/request'
import{NewReleaseForm} from '@/api/release/releaseType'
export function newRelease(form: NewReleaseForm) {
    return request({
        url: '/release/newRelease',
        data: form,
        method: 'post'
    })
}
export function delRelease(form: NewReleaseForm) {
    return request({
        url: '/release/delRelease',
        data: form,
        method: 'post'
    })
}
export function updateRelease(form: NewReleaseForm) {
    return request({
        url: '/release/updateRelease',
        data: form,
        method: 'post'
    })
}
export function getReleaseOfProject(form: String) {
    return request({
        url: '/release/getReleaseOfProject',
        params: {
            projectId:form
        },
        method: 'get'
    })
}
export function getReleaseInfo(form: String) {
    return request({
        url: '/release/getReleaseInfo',
        params: {
            releaseId:form
        },
        method: 'get'
    })
}