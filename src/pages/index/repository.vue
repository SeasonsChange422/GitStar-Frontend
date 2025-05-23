<!--
 * @Author: Dhx
 * @Date: 2025-04-02 17:43:22
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\pages\index\repository.vue
-->
<template>
    <div>
        <div class="repository-nav">
            <ul class="repository-nav-list">
                <li class="repository-nav-list-item" v-for="item in items" :key="item.text"
                    @click="router.push(`/repository?id=${repositoryId}&tabs=${item.tabs}`)">
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                        data-view-component="true" class="octicon octicon-table Underlineuser-nav-octicon">
                        <path :d="item.svg">
                        </path>
                    </svg>
                    <span>{{ item.text }}</span>
                </li>
            </ul>
        </div>
    </div>
    <repositoryOverview v-if="repository&&repository.id&&$route && $route.query.tabs == 'overview'||$route.query.tabs == null" :repository="repository"></repositoryOverview>
    <repositoryCode v-if="$route && $route.query.tabs == 'code'"></repositoryCode>
    <repositoryTask v-if="repository&&repository.id&&$route && $route.query.tabs == 'task'"  :repository="repository"></repositoryTask>
</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue' 
import {getRepositoryFolder,getRepositoryInfo} from '@/api/repository/repositoryApi'
import {GetRepositoryFolderForm,RepositoryFile,Repository} from '@/api/repository/repositoryType'
import router from '@/router'
const repositoryId = ref<Number>()
const repository = ref<Repository>({})
onMounted(() => {
    repositoryId.value = router.currentRoute.value.query.id
    getRepositoryInfoFunction()
})
const getRepositoryInfoFunction = () =>{
    getRepositoryInfo(repositoryId.value).then((res:any)=>{
        if(res.code == 200) {
            repository.value = res.data
        }
    })
}
const items = ref<{ svg: String, text: String, tabs: String }[]>([
    {
        svg: "M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z",
        text: '总览',
        tabs: 'overview'
    },
    {
        svg: "m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z",
        text: '代码',
        tabs: 'code&path=&folder=true'
    },
    {
        svg: "M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM6.5 6.5v8h7.75a.25.25 0 0 0 .25-.25V6.5Zm8-1.5V1.75a.25.25 0 0 0-.25-.25H6.5V5Zm-13 1.5v7.75c0 .138.112.25.25.25H5v-8ZM5 5V1.5H1.75a.25.25 0 0 0-.25.25V5Z",
        text: '任务',
        tabs: 'task'
    }
])
</script>
<style scoped>
.repository-nav {
    width: 100%;
    height: 48px;
    padding: 0px 16px;
    display: flex;
    background-color: #F6F8FA;
    transform: translate(0, -8px);
    border-bottom: #D1D9E0 1px solid;
}

.repository-nav-list {
    display: block;
    width: 100%;
    height: 48px;
    margin-right: 8px;
    align-items: center;
    display: flex;
}

.repository-nav-list-item {
    height: 30px;
    width: auto;
    padding: 0 8px;
    border-radius: 6px;
    margin-right: 8px;
    cursor: pointer;
    align-items: center;
    display: flex;
}

.repository-nav-list-item:hover {
    background-color: #EAEDF0;
}

.repository-nav-list-item svg {
    fill: #59636E;
    margin-right: 8px;
}

.repository-nav-list-item span {
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}
</style>