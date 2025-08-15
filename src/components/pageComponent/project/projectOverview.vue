<template>
    <div class="project-info">
        <div class="project-info-center">
            <div class="project-info-container">
                <div class="project-info-container-left">
                    <img class="project-info-logo" :src="project.logo" />
                    <div class="project-info-name">
                        {{ project.name }}
                    </div>
                </div>
                <hoverContainer>
                    <template v-slot:item>
                        <v-icon icon="mdi-dots-vertical"></v-icon>
                    </template>
                    <template v-slot:box>
                        <div class="box">
                            <transparentBtn @click="displayProjectFeedback()">
                                <span>举报项目</span>
                            </transparentBtn>
                        </div>
                    </template>
                </hoverContainer>
            </div>
            <v-divider></v-divider>

        </div>
    </div>
    <div class="project-details">

        <div class="project-details-left">
            <div class="project-details-description">
                {{ project.description }}
            </div>
            <LabelComponent
                :d="'M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z'"
                :text="'Repositories'"></LabelComponent>
            <div class="project-details-repositoryList">
                <ProjectRepositoryComponent v-for="repository in repositoryList" :key="repository.id"
                    :repository="repository"></ProjectRepositoryComponent>
            </div>
        </div>
        <div class="project-details-right">
            <labelComponent :text="'开发人员'"></labelComponent>
            <div class="developerList">
                <userComponent v-for="developer in developerList" :key="developer.id" :user="developer"></userComponent>
                <div class="join" @click="joinDialog = true">+</div>
            </div>
            <v-divider></v-divider>
            <br>
            <labelComponent :text="'发行版本'"></labelComponent>
            <div class="release-info">
                <div v-if="releaseList && releaseList.length != 0">{{ `${releaseList.length}个发行版本` }}</div>
                <routerLink :to="`project?id=${projectId}&tabs=release`">立即查看</routerLink>
            </div>
            <br>
            <v-divider></v-divider>
            <br>
            <labelComponent :text="'标签'"></labelComponent>
            <div class="tag-list">
                <tagComponent v-for="tag in tagList" :key="tag.id" :tag="tag"></tagComponent>
            </div>
        </div>
    </div>
    <dialogComponent v-model="joinDialog">
        <commonContainer>
            <template v-slot:header>
                <div class="dialog-header">
                    <span>申请加入项目</span>
                    <div class="close" @click="joinDialog = false">
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                            data-view-component="true" class="octicon octicon-x">
                            <path
                                d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z">
                            </path>
                        </svg>
                    </div>
                </div>
            </template>
            <template v-slot:body>
                <div class="dialog-body">
                    <span>确定申请加入项目？</span>
                </div>
            </template>
            <template v-slot:footer>
                <div class="dialog-footer">
                    <commonBtn class="btn" @click="joinDialog = false">
                        <div style="padding: 0 12px;">
                            取消
                        </div>
                    </commonBtn>
                    <GreenBtn class="btn" @click="addJoinRequestFunction()">
                        <div style="padding: 0 12px;">
                            确定
                        </div>
                    </GreenBtn>
                </div>
            </template>
        </commonContainer>
    </dialogComponent>
    <feedbackComponent v-model="feedbackDialog" :newFeedbackForm="newFeedbackForm"></feedbackComponent>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Project } from '@/api/project/projectType'
import { Developer } from '@/api/user/userType'
import router from '@/router'
import { Page } from '@/api/common/pageType'
import { Repository } from '@/api/repository/repositoryType'
import { NewReleaseForm, Release } from '@/api/release/releaseType'
import { addJoinRequest } from '@/api/joinRequest/joinRequestApi'
import { AddJoinRequestForm } from '@/api/joinRequest/joinRequestType'
import { Tag } from "@/api/tag/tagType";
import { errorAlert } from '@/utils/message'
import { getTagOfProject } from "@/api/tag/tagApi";
import { getReleaseOfProject } from '@/api/release/releaseApi'
import { getRepositoryListByProjectId } from '@/api/repository/repositoryApi'
import { getProjectInfo, getUserOfProject } from '@/api/project/projectApi'
import ProjectRepositoryComponent from '../../projectRepositoryComponent.vue';
import { NewFeedbackForm } from '@/api/feedback/feedbackType'
const project = ref<Project>({})
const repositoryList = ref<Repository[]>([])
const projectId = ref<Number>()
const page = ref<Page>({
    current: 1,
    size: 500
})
const feedbackDialog = ref(false)
const newFeedbackForm = ref<NewFeedbackForm>({
    type: '',
    objectId: '',
    feedback: ''
})
const addJoinRequestForm = ref<AddJoinRequestForm>({})
const joinDialog = ref(false)
const releaseList = ref<Release>()
const developerList = ref<Developer[]>([])
const tagList = ref<Tag[]>([])
onMounted(() => {
    projectId.value = router.currentRoute.value.query.id
    getProjectInfoFunction()
    getRepositoryListByProjectIdFunction()
    getUserOfProjectFunction()
    getReleaseOfProjectFunction()
    getTagsFunction()
})
const displayProjectFeedback = () => {
    newFeedbackForm.value.type = 'project'
    newFeedbackForm.value.objectId = projectId.value
    feedbackDialog.value = true
}
const getProjectInfoFunction = () => {
    getProjectInfo(projectId.value).then((res: any) => {
        if (res.code == 200) {
            project.value = res.data
        }
    })
}
const getRepositoryListByProjectIdFunction = () => {
    getRepositoryListByProjectId(page.value, projectId.value).then((res: any) => {
        if (res.code == 200) {
            repositoryList.value = res.data.records
        }
    })
}
const getUserOfProjectFunction = () => {
    getUserOfProject(projectId.value).then((res: any) => {
        if (res.code == 200) {
            developerList.value = res.data
            console.log(developerList.value)
        }
    })
}
const getReleaseOfProjectFunction = () => {
    getReleaseOfProject(projectId.value).then((res: any) => {
        if (res.code == 200) {
            releaseList.value = res.data
        }
    })
}
const getTagsFunction = () => {
    getTagOfProject(projectId.value).then((res: any) => {
        if (res.code == 200) {
            tagList.value = res.data
        }
    })
}
const addJoinRequestFunction = () => {
    addJoinRequestForm.value.projectId = projectId.value
    addJoinRequest(addJoinRequestForm.value).then((res: any) => {
        if (res.code == 200) {
            router.go(0)
        } else {
            errorAlert(res.msg)
            joinDialog.value = false
        }
    })
}
</script>
<style scoped>
.project-info {
    height: 168px;
    width: 100%;
    margin: 0 0 16px;
}

.project-info-center {
    width: 1280px;
    height: 100%;
    margin: 0 308.5px;
    padding: 0 16px;
}

.project-info-container {
    height: 128px;
    width: 1248px;
    margin: 24px 0 16px;
    padding: 0 0 24px;
    display: flex;
    justify-content: space-between;
}

.project-info-container-left {
    display: flex;
    justify-content: start;
}

.project-info-logo {
    height: 100px;
    width: 100px;
    border-radius: 6px;
    margin: 0 24px 0 0;
}

.project-info-name {
    width: 100%;
    height: 32px;
    color: #1F2328;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-size: 24px;
}
.box {
    position: relative;
    /* height: 100px; */
    min-width: 100px;
    border: #D1D9E0 1px solid;
    background-color: white;
    border-radius: 6px;
    padding: 4px;
    box-shadow: #D1D9E0 0 0 5px 1px;
}
.project-details {
    width: 1280px;
    height: auto;
    margin: 0 308.5px;
    display: flex;
}

.project-details-left {
    width: 928px;
    padding: 16px;
}

.project-details-description {
    width: 894px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-size: 16px;
    font-weight: 300;
    letter-spacing: -0.5px;
    padding: 24px;
    border-radius: 6px;
    border: #DCE2E8 1px solid;
    margin-bottom: 24px;
}

.project-details-repositoryList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.project-details-right {

    width: 320px;
    padding: 0 16px;
}

.developerList {
    padding: 8px;
    display: flex;
    gap: 8px;
    margin: 16px 0;
}

.join {
    height: 34px;
    width: 34px;
    border-radius: 17px;
    border: #DCE2E8 1px solid;
    cursor: pointer;
    display: flex;
    /* align-items: center; */
    justify-content: center;
    font-size: 24px;
    line-height: 28px;
    color: #DCE2E8;
}

.join:hover {
    border: #F6F8FA 1px solid;
    background-color: #DCE2E8;
    color: #F6F8FA;
}

.release-info {
    font-size: 12px;
    padding: 8px;
}

.release-info * {
    color: #59636E;
}

.release-info a {
    text-decoration: none;
}

.release-info a:hover {
    color: #0969DA;
    text-decoration: underline;
}

.tag-list {
    width: 100%;
    padding: 8px;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    gap: 8px;
    row-gap: 8px;
}

.dialog-header {
    display: flex;
    padding: 12px;
    font-size: 14px;
    color: #1F2328;
    justify-content: space-between;
}

.dialog-body {
    width: 100%;
    height: 100%;
    padding: 16px;
}

.dialog-footer {
    padding: 16px;
    display: flex;
    justify-content: end;
}

.close {
    cursor: pointer;
}

.close:hover {
    fill: #0969DA;
}

.btn {
    margin-right: 8px;
}
</style>