/*
 * @Author: Dhx
 * @Date: 2025-02-26 15:47:14
 * @Description: f
 * @FilePath: \GitStar-Frontend\src\api\project\projectApi.ts
 */
import request from '@/utils/request'
import { Page } from '@/api/common/pageType'
import{ UpdateProjectForm} from '@/api/project/projectType'
export function getProjectByToken(form: Page) {
    return request({
        url: '/project/getProjectByToken',
        data: form,
        method: 'post'
    })
}
export function getProjectList(form: Page) {
    return request({
        url: '/project/getProjectList',
        data: form,
        method: 'post'
    })
}
export function newProject(form: Page) {
    return request({
        url: '/project/newProject',
        data: form,
        method: 'post'
    })
}
export function updateProject(form: UpdateProjectForm) {
    return request({
        url: '/project/updateProject',
        data: form,
        method: 'post'
    })
}

export function getProjectInfo(form: String) {
    return request({
        url: '/project/getProjectInfo',
        params: {
            projectId:form
        },
        method: 'get'
    })
}
export function searchProject(form:String) {
    return request({
        url: '/project/search',
        params: {
            key:form
        },
        method: 'get'
    })
}
export function getUserOfProject(form:String){
    return request({
        url: '/project/getUserOfProject',
        params: {
            projectId:form
        },
        method: 'get'
    })
}
export function getPostOfProject(form:String){
    return request({
        url: '/project/getPostOfProject',
        params: {
            projectId:form
        },
        method: 'get'
    })
}