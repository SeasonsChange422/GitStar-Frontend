/*
 * @Author: Dhx
 * @Date: 2025-05-10 17:17:10
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\api\joinRequest\joinRequestApi.ts
 */
import request from '@/utils/request'
import{ AddJoinRequestForm,AcceptJoinRequestForm,RefuseJoinRequestForm} from '@/api/joinRequest/joinRequestType'
export function addJoinRequest(form: AddJoinRequestForm) {
    return request({
        url: '/joinRequest/addRequest',
        data: form,
        method: 'post'
    })
}

export function acceptJoinRequest(form: AcceptJoinRequestForm) {
    return request({
        url: '/joinRequest/acceptRequest',
        data: form,
        method: 'post'
    })
}

export function refuseJoinRequest(form: RefuseJoinRequestForm) {
    return request({
        url: '/joinRequest/refuseRequest',
        data: form,
        method: 'post'
    })
}

export function getRequestOfProject(form: String) {
    return request({
        url: '/joinRequest/getRequestOfProject',
        params: {
            projectId:form
        },
        method: 'get'
    })
}
