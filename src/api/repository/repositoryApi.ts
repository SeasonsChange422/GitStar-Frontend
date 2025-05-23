/*
 * @Author: Dhx
 * @Date: 2025-02-26 23:18:34
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\api\repository\repositoryApi.ts
 */
import request from "@/utils/request"
import { Page } from '@/api/common/pageType'
import {NewRepository,UploadFileForm,GetRepositoryFileForm,GetRepositoryFolderForm,UpdateRepositoryForm} from '@/api/reposiotry/repositoryType'
export function getRepositoryList(form:Page){
    return request({
        url: '/repository/getRepositoryList',
        data: form,
        method: 'get'
    })
}
export function getRepositoryListByProjectId(form:Page,id:String){
    return request({
        url: '/repository/getRepositoryListByProjectId',
        data:form,
        params: {
            projectId:id
        },
        method: 'post'
    })
}
export function newRepository(form:NewRepository){
    return request({
        url: '/repository/newRepository',
        data:form,
        method: 'post'
    })
}
export function updateRepository(form:UpdateRepositoryForm){
    return request({
        url: '/repository/updateRepository',
        data:form,
        method: 'post'
    })
}
export function getRepositoryInfo(form:String){
    return request({
        url: '/repository/getRepositoryInfo',
        params: {
            repositoryId:form
        },
        method: 'get'
    })
}

export function getRepositoryFolder(form:GetRepositoryFolderForm) {
    return request({
        url: '/repository/getRepositoryFolder',
        params: {
            repositoryId: form.repositoryId,
            path: form.path
        },
        method: 'get'
    })
}
export function uploadRepositoryFile(form:UploadFileForm) {
    const formData = new FormData();
    formData.append('repositoryId', form.repositoryId);
    formData.append('file', form.file);
    formData.append('path', form.path!=''?form.path:form.file.webkitRelativePath)
    return request({
        method:'post',
        url:'/repository/uploadRepositoryFile',
        data:formData,
        timeout: 100000
    })
}

export function getRepositoryFile(form:GetRepositoryFileForm) {
    return request({
        url: '/repository/getRepositoryFile',
        params: {
            repositoryId: form.repositoryId,
            path: form.path
        },
        method: 'get'
    })
}

export function getRepositoryREADME(form:String) {
    return request({
        url: '/repository/getRepositoryREADME',
        params: {
            repositoryId: form,
        },
        method: 'get'
    })
}

export function starRepository(form:String) {
    return request({
        url: '/repository/starRepository',
        params: {
            repositoryId: form,
        },
        method: 'get'
    })
}

export function downloadRepository(form:String){
    return request({
        url: '/repository/downloadRepository',
        params: {
            repositoryId:form,
        },
        method: 'get'
    })
}