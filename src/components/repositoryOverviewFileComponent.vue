<!--
 * @Author: Dhx
 * @Date: 2025-04-07 17:47:00
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\repositoryOverviewFileComponent.vue
-->
<template>
    <div class="container">
        <div class="container-name">
            <div class="icon">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="#54AEFF" v-if="file.folder"
                        data-view-component="true" class="octicon octicon-table Underlineuser-nav-octicon">
                        <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z">
                        </path>
                </svg>
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" v-else
                        data-view-component="true" class="octicon octicon-table Underlineuser-nav-octicon">
                        <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z">
                        </path>
                </svg>
            </div>
            <div class="name">
                <RouterLink :to="`/repository?id=${repositoryId}&tabs=code&path=${file.path.substring(file.path.indexOf('/')+1)}&folder=${file.folder}`">{{ file.path.replace(path,'').replace('/','') }}</RouterLink>
            </div>
        </div>
        <div class="container-description">

        </div>
        <div class="container-time">
            {{getTimeAgo(file.modifyTime)}}
        </div>
    </div>
</template>
<script lang="ts" setup>
import {RepositoryFile} from '@/api/repository/repositoryType'
import {getTimeAgo} from '@/utils/time'
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import router from '@/router'
const props = defineProps({
    file: {} as RepositoryFile
})
const path = ref<String>()
const repositoryId = ref<Number>()
const currentFile = ref<RepositoryFile>()
onMounted(()=>{
    repositoryId.value = router.currentRoute.value.query.id
    path.value = router.currentRoute.value.query.path? `${repositoryId.value}/${router.currentRoute.value.query.path}`:`${repositoryId.value}/`
    currentFile.value = props.file
})
</script>
<style scoped>
.container{
    height: 41px;
    width: 100%;
    display: flex;
    border-bottom: #D1D9E0 1px solid;
}
.container-name{
    height: 41px;
    width: 357.59px;
    padding: 0 0 0 16px;
    display: flex;
    align-items: center;
}
.icon{

}
.name{
    margin-left: 10px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}
.name a{
    text-decoration: none;
}
.name a:hover{
    color: #0969DA;
    text-decoration: underline;
}
.container-description{
    height: 41px;
    width: 400.41px;
    padding: 0 0 0 16px;
}
.container-time{
    height: 41px;
    width: 136px;
    font-size: 14px;
    line-height: 41px;
    letter-spacing: 1px;
    color: #59636E;
    padding: 0 0 0 16px;
}
</style>