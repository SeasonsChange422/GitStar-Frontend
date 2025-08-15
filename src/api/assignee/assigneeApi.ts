/*
 * @Author: Dhx
 * @Date: 2025-05-16 01:39:28
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\api\assignee\assigneeApi.ts
 */
import request from '@/utils/request'
export function claimTask(form:String) {
    return request({
        url: '/assignee/claimTask',
        params: {
            taskId:form
        },
        method: 'post'
    })
}

export function getAssigneeOfTask(form:String) {
    return request({
        url: '/assignee/getAssigneeOfTask',
        params: {
            taskId:form
        },
        method: 'get'
    })
}