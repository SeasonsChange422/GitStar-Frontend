<!--
 * @Author: Dhx
 * @Date: 2025-05-10 15:50:15
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\pageComponent\project\setting\developerSetting.vue
-->
<template>
    <div class="page">
        <labelComponent :text="'开发人员'"></labelComponent>
        <div class="developer-list">
            <userComponent v-for="developer in developerList" :key="developer.id" :user="developer"></userComponent>
        </div>
        <br>
        <v-divider></v-divider>
        <br>
        <labelComponent :text="'加入申请'"></labelComponent>
        <div class="request-list" v-if="joinRequestList.length!=0">
            <joinRequestComponent v-for="joinReqeust in joinRequestList" :key="joinReqeust.id" :joinRequest="joinReqeust"></joinRequestComponent>
        </div>
        <div v-else class="empty">暂无申请</div>
        <br>
        <v-divider></v-divider>
    </div>
</template>
<script setup lang="ts">

import { Project } from '@/api/project/projectType'
import { getUserOfProject } from '@/api/project/projectApi'
import { Developer } from '@/api/user/userType'
import { JoinRequest } from '@/api/joinRequest/joinRequestType'
import { getRequestOfProject} from '@/api/joinRequest/joinRequestApi'
import { onMounted, ref } from 'vue';
const props = defineProps({
    project: {} as Project
})
const developerList = ref<Developer[]>([])
const localProject = ref<Project>()
const joinRequestList = ref<JoinRequest[]>([])
onMounted(() => {
    localProject.value = props.project
    getUserOfProjectFunction()
    getRequestOfProjectFuction()
})
const getUserOfProjectFunction = () => {
    getUserOfProject(localProject.value.id).then((res: any) => {
        if (res.code == 200) {
            developerList.value = res.data
        }
    })
}
const getRequestOfProjectFuction = () => {
    getRequestOfProject(localProject.value.id).then((res:any) => {
        if(res.code == 200){
            joinRequestList.value = res.data
        }
    })
}
</script>
<style scoped>
.page {
    width: 100%;
    min-height: 70vh;
    padding: 16px;
}

.developer-list {
    width: 100%;
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    row-gap: 8px;
}
.request-list{
    padding: 8px;
}
.empty{
    margin: 96px 0;
    text-align: center;
    font-size: 14px;
}
</style>