<!--
 * @Author: Dhx
 * @Date: 2025-02-27 23:22:32
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\liteProjectComponent.vue
-->
<template>
    <div class="project-container" :key="currentProject">
            <img class="project-container-image" :src="currentProject.logo" />
            <div class="project-container-text">
                <div class="project-container-text-name">
                    <router-link :to="`/project?id=${currentProject.id}`">
                        {{ developerList[0].nickname + '/' + currentProject.name }}
                    </router-link>
                    
                </div>
            </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Project } from '@/api/project/projectType'
import {Developer} from '@/api/user/userType'
import {getUserOfProject} from '@/api/project/projectApi'
const props = defineProps({
    project: {} as Project,
})
const developerList = ref<Developer[]>([{
    nickname:''
}])
const currentProject = ref<Project>({

})
onMounted(() => {
    currentProject.value = props.project
    getUserFunction()
})
const getUserFunction = () => {
    getUserOfProject(currentProject.value.id).then((res:any)=>{
        if(res.code == 200) {
            developerList.value = res.data
            developerList.value.filter((developer=>{return developer.auth=='administrator'}))
        }
    })
}
</script>
<style scoped>
.project-container {
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    margin-top: 4px;
}

.project-container-image {
    height: 16px;
    width: 16px;
    border-radius: 1px;
}

.project-container-text {
    margin-left: 4px;
    height: 20px;
    width: calc(100% - 20px);
    padding: 2;
}

.project-container-text-name {
    height: 20px;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 1px;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}

.project-container-text-name a {
    text-decoration: none;
    color: black;
}

.project-container-text-name a:hover {
    text-decoration: underline;
}
</style>