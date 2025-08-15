/*
 * @Author: Dhx
 * @Date: 2025-05-04 02:03:16
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\utils\encode.ts
 */
export function base64_to_utf8(str:string){
    return decodeURIComponent(escape(window.atob(str)))
}

export function utf8_to_base64(str:string){
    return window.btoa(unescape(encodeURIComponent(str)))
}