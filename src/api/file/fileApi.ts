/*
 * @Author: Dhx
 * @Date: 2025-02-28 02:56:19
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\api\file\fileApi.ts
 */
import request from '@/utils/request'
export function uploadPicture(file:File){
    const formData = new FormData();
    formData.append('wangeditor-uploaded-image', file);
    return request({
        method:'post',
        url:'/fileApi/file/upload',
        data:formData,
        timeout: 100000
    })
}

export function uploadFile(file:File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', file.webkitRelativePath)
    return request({
        method:'post',
        url:'/repository/uploadRepositoryFile',
        data:formData,
        timeout: 100000
    })
}