<template>
    <div class="user-project">
        <div class="user-project-operation">
            <!-- <div class="user-project-operation-search-icon">
                <svg data-target="primer-text-field.leadingVisual" aria-hidden="true" height="16" viewBox="0 0 16 16"
                    version="1.1" width="16" data-view-component="true"
                    class="octicon octicon-search FormControl-input-leadingVisual">
                    <path
                        d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z">
                    </path>
                </svg>
            </div> -->
            <!-- <input class="user-project-operation-search" /> -->
            <div class="user-project-operation-new" @click="router.push('/newProject')">
                新建项目
            </div>
        </div>
        <div class="user-project-list">
            <div class="user-project-list-header">

            </div>
            <div class="user-project-list-item" v-for="project in projectList" :key="project.id">
                <ProjectComponent :project="project"></ProjectComponent>

            </div>
            <div class="more" @click="getProjectListFunction">
                更多...
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Project } from '@/api/project/projectType'
import { Page } from '@/api/common/pageType'
import { getProjectByToken } from '@/api/project/projectApi'
import router from '@/router'
const projectList = ref<Project[]>([

])
const page = ref<Page>({
    current: 1,
    size: 500
})
onMounted(() => {
    getProjectListFunction()
})
const getProjectListFunction = () => {
    getProjectByToken(page.value).then((res: any) => {
        if (res.code == 200) {
            projectList.value = projectList.value.concat(res.data.records)
            page.value.current++
        }
    })
}
</script>
<style scoped>
.user-project {
    width: 100%;
    height: auto;
    margin: 10px 0 0;
}

.user-project-operation {
    position: relative;
    width: 100%;
    height: 32px;
    display: flex;
}

.user-project-operation-search-icon {
    position: absolute;
    left: 8px;
    top: 8px;
    fill: #59636E;
}

.user-project-operation-search {
    width: 785px;
    height: 32px;
    padding: 5px 32px;
    background-color: #FFFFFF;
    border: #D1D9E0 1px solid;
    border-radius: 6px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    outline: none;
}

.user-project-operation-search:focus {
    border: #0969DA 2px solid;
}

.user-project-operation-new {
    height: 32px;
    width: auto;
    margin-left: 8px;
    padding: 0px 12px;
    font-size: 14px;
    line-height: 32px;
    font-weight: 600;
    border-radius: 6px;
    letter-spacing: -0.5px;
    cursor: pointer;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    background-color: #1F883D;
}

.user-project-operation-new:hover {
    background-color: #1C8139;
}

.user-project-list {
    width: 100%;
    /* height: auto; */
    border-radius: 6px;
    margin-top: 20px;
    border: #D1D9E0 1px solid;
}

.user-project-list-header {
    width: 100%;
    height: 65px;
    padding: 16px;
    border-bottom: #D1D9E0 1px solid;
    border-radius: 6px 6px 0 0;
    background-color: #F6F8FA;
}

.user-project-list-item {
    width: 100%;
    height: 113px;
    margin: -1px 0 0;
    padding: 16px;
}

.more {
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
    text-align: center;
    cursor: pointer;
}
</style>