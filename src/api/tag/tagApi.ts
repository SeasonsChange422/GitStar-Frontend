import request from "@/utils/request";
import {NewTagForm,DelTagForm,ProjectTagForm} from '@/api/tag/tagType'

export function newTag(form:NewTagForm){
    return request({
        url: "/admin/newTag",
        data: form,
        method: 'post'
    })
}

export function delTag(form:DelTagForm){
    return request({
        url: "/admin/delTag",
        data: form,
        method: 'post'
    })
}


export function getTags(){
    return request({
        url: "/tag/getTags",
        method: 'get'
    })
}
export function getTagOfProject(form:String){
    return request({
        url: "/tag/getTagOfProject",
        params: {
            projectId: form
        },
        method: 'get'
    })
}
export function addTagToProject(form:ProjectTagForm){
    return request({
        url: "/tag/addTagToProject",
        data:form,
        method: 'post'
    })
}

export function removeTagFromProject(form:ProjectTagForm){
    return request({
        url: "/tag/removeTagFromProject",
        data:form,
        method: 'post'
    })
}