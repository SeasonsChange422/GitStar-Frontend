<template>
    <div class="user-nav">
        <ul class="user-nav-list">
            <li class="user-nav-list-item" v-for="item in items" :key="item.text" @click="router.push(item.href)">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                    data-view-component="true" class="octicon octicon-table Underlineuser-nav-octicon">
                    <path :d="item.svg">
                    </path>
                </svg>
                <span>{{ item.text }}</span>
            </li>
        </ul>
    </div>
    <div class="user-container">
        <div class="user-container-left">
            <v-file-input label="File input" accept="image/*" v-model="file" @change="change" ref="fileInput" style="position: absolute;visibility: hidden;"></v-file-input>
            <img class="user-container-left-avatar" :src="user.avatar" @click="fileInput.click">
            <div class="user-container-left-name">
                <div class="user-container-left-name-nickname">
                    {{ user.nickname }}
                </div>
                <div class="user-container-left-name-username">
                    {{ user.username }}
                </div>
            </div>
            <div class="user-container-edit">
                编辑信息
            </div>
        </div>
        <div class="user-container-right">
            <userProject v-if="$route&&$route.query.tabs == 'project'"></userProject>
            <userPost v-if="$route&&$route.query.tabs == 'post'"></userPost>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { storage } from '@/utils/storage'
import {uploadPicture} from '@/api/file/fileApi'
import {updateUserInfo} from '@/api/user/userApi'
import router from '@/router'
import { User } from '@/api/user/userType'
const fileInput = ref()
const user = ref<User>({

})
const file = ref<File>()
const change= () => {
    uploadPicture(file.value).then((res:any)=>{
        if(res.errno == 0) {
            user.value.avatar = res.data.url
            updateUserInfo(user.value).then((res:any)=>{
                storage.set('user',user.value)
                setTimeout(()=>{
                    router.go(0)
                },2000)
            })
        }
    })
}
onMounted(() => {
    user.value = storage.get('user')
})
const items = ref<{ svg: String, text: String, href:String }[]>([
    {
        svg: "M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM6.5 6.5v8h7.75a.25.25 0 0 0 .25-.25V6.5Zm8-1.5V1.75a.25.25 0 0 0-.25-.25H6.5V5Zm-13 1.5v7.75c0 .138.112.25.25.25H5v-8ZM5 5V1.5H1.75a.25.25 0 0 0-.25.25V5Z",
        text: '我的项目',
        href: '/user?tabs=project'
    },
    // {
    //     svg: "M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z",
    //     text: 'Repositories',
    //     href: '/user?tabs=repository'
    // },
    {
        svg: "M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z",
        text: '我的帖子',
        href: '/user?tabs=post'
    }
])
</script>
<style scoped>
.user-nav {
    width: 100%;
    height: 48px;
    padding: 0px 16px;
    display: flex;
    background-color: #F6F8FA;
    transform: translate(0, -8px);
    border-bottom: #D1D9E0 1px solid;
}

.user-nav-list {
    display: block;
    width: 100%;
    height: 48px;
    margin-right: 8px;
    align-items: center;
    display: flex;
}

.user-nav-list-item {
    height: 30px;
    width: auto;
    padding: 0 8px;
    border-radius: 6px;
    margin-right: 8px;
    cursor: pointer;
    align-items: center;
    display: flex;
}

.user-nav-list-item:hover {
    background-color: #EAEDF0;
}

.user-nav-list-item svg {
    fill: #59636E;
    margin-right: 8px;
}

.user-nav-list-item span {
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}

.user-container {
    width: 1280px;
    height: 100%;
    margin: 8px 308.5px 0;
    padding: 0 32px;
    display: flex;
}

.user-container-left {
    width: 296px;
    height: 100%;
}

.user-container-left-avatar {
    width: 296px;
    height: 296px;
    margin-top: 24px;
    border-radius: 148px;
    cursor: pointer;
}
.user-container-left-name{
    width: 100%;
    height: 86px;
    padding: 16px 0;
}
.user-container-edit{
    width: 100%;
    height: 32px;
    padding: 5px 16px;
    text-align: center;
    border-radius: 8px;
    background-color: #F6F8FA;
    font-size: 14px;
    font-weight: 700;
    border: #D1D9E0 1px solid;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}
.user-container-edit:hover{
    background-color: #EFF2F5;
}

.user-container-left-name-nickname{
    width: 100%;
    height: 30px;
    color: #1f2328;
    font-size: 24px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}
.user-container-left-name-username{
    width: 100%;
    height: 24px;
    color: #59636e;
    font-size: 19px;
    font-weight: 300;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}
.user-container-right {
    width: 896px;
    height: 100%;
    margin-left: 24px;
}
</style>