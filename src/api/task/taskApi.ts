import request from '@/utils/request'
import { Task, NewTaskForm, CloseTaskForm } from '@/api/task/taskType'
import { url } from 'inspector'
export function newTask(form: NewTaskForm) {
    return request({
        url: "/task/newTask",
        data: form,
        method: 'post'
    })
}
export function closeTask(form: CloseTaskForm) {
    return request({
        url: "/task/closeTask",
        data: form,
        method: 'post'
    })
}
export function getTaskList(form: String) {
    return request({
        url: "/task/getTaskList",
        params: {
            repositoryId:form
        },
        method: 'get'
    })
}

export function getClosedTaskList(form: String) {
    return request({
        url: "/task/getClosedTaskList",
        params: {
            repositoryId:form
        },
        method: 'get'
    })
}

export function getTaskInfo(form:String) {
    return request({
        url: "/task/getTaskInfo",
        params: {
            taskId:form
        },
        method: 'get'
    })
}

export function getRepositoryOfTask(form:String) {
    return request({
        url: "/task/getRepositoryOfTask",
        params: {
            taskId:form
        },
        method: 'get'
    })
}