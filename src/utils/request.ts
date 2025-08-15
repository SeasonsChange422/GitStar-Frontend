/*
 * @Author: Dhx
 * @Date: 2025-01-13 22:45:23
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\utils\request.ts
 */
import axios from 'axios'
import router from '../router'
import {storage} from '@/utils/storage'
const request = axios.create({
    baseURL: '/api',
    timeout: 60000,
})

request.interceptors.request.use(config => {
    if (config.headers.isAuth == 'true') { // 未登录遇到需要登录的接口跳转到登录页
        if (!storage.get('token')) {
            router.push('/login')
            return Promise.reject()
        }
    }
    if(storage.get('token')) {
        config.headers.token = storage.get('token')
    } else {
        config.headers.token = ''
    }

    return config
}, (error) => Promise.reject(error))

request.interceptors.response.use(response => {
    const res = response.data
    if (res.code == '401' ) {
        storage.remove('token')
        router.push('/login')
    }
    if(res.msg == '用户未登录'){
        storage.remove('token')
        router.push('/login')
    }
    // 如果接口正常，直接返回数据

    return res
}, (error) => {
    if (error.name == 'Error') {
        // useMessage().error(error.msg)
    } else {
        // useMessage().error(error.response.data.data || error.message)
    }

    return Promise.reject(error)
})

export default request