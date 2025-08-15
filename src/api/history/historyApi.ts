import request from '@/utils/request'
import { TaskHistory, NewHistoryForm } from '@/api/task/taskType'
export function newHistory(form: NewHistoryForm) {
    return request({
        url: "/history/newHistory",
        data: form,
        method: 'post'
    })
}

export function getHistoryOfTask(form:String){
    return request({
        url: "/history/getHistoryOfTask",
        params: {
            taskId: form
        },
        method: 'get'
    })
}