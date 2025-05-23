<template>
    <div class="page">
        <div class="title">
            {{ task.title }}
        </div>
        <div class="stats">
            <div class="item" :style="{'background-color':task.closed?(task.type==='COMPLETED'?'#8250DF':'#59636E'):'#1F883D'}">
                <smallLabelComponent :fill="'#FFFFFF'" :dArray="[
                        'M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
                        'M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z'
                    ]"
                    :text="task.closed?(task.type==='COMPLETED'?'已完成':'已关闭'):'进行中'">
                </smallLabelComponent>
            </div>
        </div>
        <div class="body">
            <div class="left">
                <historyComponent v-for="history in historyList" :key="history.id" :history="history">
                </historyComponent>
                <div class="operation">
                    <!-- <hoverContainer>
                        <template v-slot:item>
                            <commonBtn>
                                <span>关闭该任务</span>
                            </commonBtn>
                        </template>
                        <template v-slot:box>
                            <div class="box">
                                <transparentBtn @click="closeTaskFunction('completed')">已完成</transparentBtn>
                                <transparentBtn @click="closeTaskFunction('terminate')">终止</transparentBtn>
                            </div>
                        </template>
                    </hoverContainer> -->
                    <commonBtn @click="closeTaskFunction('completed')">
已完成
                    </commonBtn>
                    <commonBtn @click="closeTaskFunction('terminate')">
                        终止
                    </commonBtn>
                    <greenBtn @click="uploadDialog = true">
                        <span>
                            上传代码
                        </span>
                    </greenBtn>
                </div>
            </div>
            <div class="right">
                <smallLabelComponent :text="'执行人'"></smallLabelComponent>
                <div class="assignee">
                    <div class="remove" v-if="user && user.id" @click="claimTaskFunction()">x</div>
                    <userComponent class="user" v-if="user && user.id" :user="user"></userComponent>

                    <div class="assign" v-else @click="claimTaskFunction()">+</div>
                </div>
                <v-divider></v-divider>
                <!-- <samllLabelComponent :text="'仓库'"></samllLabelComponent> -->
                <div>
                    <!-- <projectRepositoryComponent :repository="repository"></projectRepositoryComponent> -->
                </div>
            </div>
        </div>
    </div>
    <dialogComponent v-model="uploadDialog">
        <commonContainer class="dialog">
            <template v-slot:header>
                <div class="dialog-header">
                    <span>上传代码</span>
                    <div class="close" @click="uploadDialog = false">
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
                    <div class="currentPath">
                        <commonBtn @click="back">&lt;</commonBtn>
                        <LabelComponent :dArray="[]" :text="'上传至'"></LabelComponent>
                        <commonInput v-model="currentPath"></commonInput>
                    </div>
                    <folderListComponent :repositoryId="repository.id" v-model="currentPath"></folderListComponent>
                    <div class="uploadInfo" v-if="uploadInfo.total != 0">
                        <div class="process">
                            <div class="process-inner" :style="`width:${uploadInfo.finished * 100 / uploadInfo.total}%`">

                            </div>
                        </div>
                        <div v-if="uploadInfo.finished != uploadInfo.total">{{
                            `${uploadInfo.finished}/${uploadInfo.total}` }}</div>
                        <div v-else>上传完成</div>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="dialog-footer">
                    <commonBtn class="btn" @click="uploadFiles()">
                        <div style="padding: 0 12px;">
                            上传文件
                        </div>
                    </commonBtn>
                    <commonBtn class="btn" @click="uploadFolder()">
                        <div style="padding: 0 12px;">
                            上传文件夹
                        </div>
                    </commonBtn>
                </div>
            </template>
        </commonContainer>
    </dialogComponent>
    <input type="file" style="visibility: hidden;" ref="uploadFolderRef" webkitdirectory @change="change">
    <input type="file" style="visibility: hidden;" ref="uploadFilesRef" multiple @change="change">
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { History, NewHistoryForm } from '@/api/history/historyType'
import { newHistory, getHistoryOfTask } from '@/api/history/historyApi'
import { Task, CloseTaskForm } from '@/api/task/taskType'
import { getTaskInfo, getRepositoryOfTask, closeTask } from '@/api/task/taskApi'
import { claimTask, getAssigneeOfTask } from '@/api/assignee/assigneeApi'
import { User } from '@/api/user/userType'
import router from '@/router'
import { storage } from '@/utils/storage'
import { errorAlert } from '@/utils/message'
import { Repository } from '@/api/repository/repositoryType'
import { getRepositoryFolder, uploadRepositoryFile } from '@/api/repository/repositoryApi'
const taskId = ref(0)
const historyList = ref<History[]>([])
const newHistoryForm = ref<NewHistoryForm>({})
const user = ref<User>({})
const loginUser = ref<User>({})
const task = ref<Task>({})
const uploadDialog = ref<Boolean>(false)
const uploadFolderRef = ref()
const uploadFilesRef = ref()
const repository = ref<Repository>({})
const currentPath = ref('')
const closeTaskForm = ref<CloseTaskForm>({})
onMounted(() => {
    taskId.value = router.currentRoute.value.query.id
    loginUser.value = storage.get('user')
    getHistoryOfTaskFunction()
    getAssigneeOfTaskFunction()
    getRepositoryOfTaskFunction()
    getTaskInfoFunction()
})
const back = () => {
    const pathSegments = currentPath.value.split('/').filter(Boolean)
    if (pathSegments.length <= 1) {
        currentPath.value = ''
        return
    }
    pathSegments.pop()
    currentPath.value = pathSegments.join('/') + '/'
}
const uploadFolder = () => {
    if(task.value.closed)return
    uploadFolderRef.value.click()
}
const uploadFiles = () => {
    if(task.value.closed)return
    uploadFilesRef.value.click()
}
const uploadInfo = ref({
    total: 0,
    finished: 0
})
const firstFile = ref<File>()
const change = function (items) {
    uploadInfo.value.total = items.target.files.length
    firstFile.value = items.target.files[0]
    for (let i = 0; i < items.target.files.length; i++) {
        let file = items.target.files[i];
        let uploadFileForm = {
            repositoryId: repository.value.id,
            file: file,
            path: file.webkitRelativePath == '' ? `/${file.webkitRelativePath}/${file.name}` : ''
        }
        uploadRepositoryFile(uploadFileForm).then((res: any) => {
            if (res.code == 200) {
                uploadInfo.value.finished++
            } else {
                uploadDialog.value = false
                errorAlert(res.msg)
            }
        })
    }
    newHistoryForm.value.content = `已将${firstFile.value?.name}等${uploadInfo.value.total}个文件上传`
    newHistoryFunction()
}
const getHistoryOfTaskFunction = () => {
    getHistoryOfTask(taskId.value).then((res: any) => {
        if (res.code == 200) {
            historyList.value = res.data
        }
    })
}
const getAssigneeOfTaskFunction = () => {
    getAssigneeOfTask(taskId.value).then((res: any) => {
        if (res.code == 200) {
            user.value = res.data
        }
    })
}
const claimTaskFunction = () => {
    if(task.value.closed)return
    claimTask(taskId.value).then((res: any) => {
        if (res.code == 200) {
            if (user.value && user.value.id) {
                newHistoryForm.value.content = `已将执行人${user.value.nickname}移除`
            } else if (loginUser.value && loginUser.value.id) {
                newHistoryForm.value.content = `已将${loginUser.value.nickname}设置为执行人`
            }
            newHistoryFunction()
        }
    })
}
const getTaskInfoFunction = () => {
    getTaskInfo(taskId.value).then((res: any) => {
        if (res.code == 200) {
            task.value = res.data
        }
    })
}
const newHistoryFunction = () => {
    if(task.value.closed)return
    newHistoryForm.value.taskId = taskId.value
    newHistory(newHistoryForm.value).then((res: any) => {
        if (res.code == 200) {
            router.go(0)
        }
    })
}
const getRepositoryOfTaskFunction = () => {
    getRepositoryOfTask(taskId.value).then((res: any) => {
        if (res.code == 200) {
            repository.value = res.data
        }
    })
}
const closeTaskFunction = (type: String) => {
    if(task.value.closed)return
    closeTaskForm.value.type = type
    closeTaskForm.value.repositoryId = repository.value.id
    closeTaskForm.value.taskId = taskId.value
    closeTask(closeTaskForm.value).then((res: any) => {
        if (res.code == 200) {
            router.go(0)
        }
    })
}
</script>
<style scoped>
.page {
    width: 1280px;
    margin: 0 308.5px;
    padding: 16px 24px;
}

.title {
    height: 45px;
    color: #1f2328;
    font-size: 32px;
    font-weight: 500;
}

.stats {
    height: 56px;
    padding: 12px 0;
    border-bottom: #D1D9E0 1px solid;
}

.item {
    height: 32px;
    border-radius: 16px;
    /* background-color: #1F883D; */
    display: flex;
    width: fit-content;
    align-items: center;
    padding: 0 8px;
}

.item * {
    color: white;
}

.body {
    width: 100%;
    display: flex;
    gap: 16px;
}

.left {
    width: 912px;
    padding: 16px;
}

.operation {
    height: 64px;
    margin-top: 24px;
    padding: 8px;
    display: flex;
    justify-content: right;
    align-items: center;
}

.box {
    position: relative;
    /* height: 100px; */
    min-width: 100px;
    border: #D1D9E0 1px solid;
    background-color: white;
    border-radius: 6px;
    padding: 4px;
    transform: translate(32px, 8px);
    box-shadow: #D1D9E0 0 0 5px 1px;
}

.right {
    width: 296px;
    padding: 8px;
}

.assignee {
    /* padding: 8px; */
    margin: 16px 0;
}

.assign {
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

.assign:hover {
    border: #F6F8FA 1px solid;
    background-color: #DCE2E8;
    color: #F6F8FA;
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

.currentPath {
    padding: 0 16px;
    display: flex;
    justify-content: start;
    align-items: center;
}

.remove {
    display: none;
    width: 32px;
    position: absolute;
    color: red;
    font-size: 12px;
    /* z-index: ; */
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    transform: translate(20px, -5px);
}

.assignee:hover>.remove {
    display: block;
}

.remove:hover {
    font-weight: 700;
}
</style>