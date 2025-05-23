<!--
 * @Author: Dhx
 * @Date: 2025-05-15 19:07:38
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\pageComponent\repository\repositoryTask.vue
-->
<template>
    <div class="task-page">
        <div class="operation">
            <greenBtn @click="newTaskDialog = true">
                <span>新建任务</span>
            </greenBtn>
        </div>
        <div class="page-body">
            <commonContainer :scroll="false">
                <template v-slot:header>
                    <div class="container-header">
                        <commonBtn @click="clickType(flase)">执行中</commonBtn>
                        <commonBtn @click="clickType(true)">已结束</commonBtn>
                    </div>
                </template>
                <template v-slot:body>
                    <div class="container-body">
                        <taskComponent v-for="task in taskList" :key="task.id" :task="task" :fill="task.closed?(task.type=='COMPLETED'?'#B05FE2':'#59636E'):'#1F883D'"></taskComponent>
                    </div>
                </template>
            </commonContainer>
        </div>
    </div>
    <dialogComponent v-model="newTaskDialog">
        <commonContainer :scroll="false">
            <template v-slot:header>
                <div class="dialog-header">
                    <span>新建任务</span>
                    <div class="close" @click="newTaskDialog = false">
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
                    <LabelComponent :dArray="[]" :text="'任务'"></LabelComponent>
                    <commonInput v-model="newTaskForm.title"></commonInput>
                </div>
            </template>
            <template v-slot:footer>
                <div class="dialog-footer">
                    <commonBtn class="btn" @click="newTaskDialog = false">
                        <div style="padding: 0 12px;">
                            取消
                        </div>
                    </commonBtn>
                    <greenBtn class="btn" @click="newTaskFunction()">
                        <div style="padding: 0 12px;">
                            新建
                        </div>
                    </greenBtn>
                </div>
            </template>
        </commonContainer>

    </dialogComponent>
</template>
<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { Task,NewTaskForm } from '@/api/task/taskType'
import {newTask,getTaskList,getClosedTaskList} from '@/api/task/taskApi'
import { Repository } from '@/api/repository/repositoryType'
import router from '@/router'
const props = defineProps({
    repository: {} as Repository
})
const localRepository = ref<Repository>({})
onMounted(()=>{
    localRepository.value = props.repository
    newTaskForm.value.repositoryId = localRepository.value.id
    getTaskListFunction()
})
const selectClosed = ref(false)
const taskList = ref<Task[]>([])
const newTaskDialog = ref(false)
const newTaskForm = ref<NewTaskForm>({})
const newTaskFunction = () => {
    newTask(newTaskForm.value).then((res:any)=>{
        if(res.code == 200){
            let task = res.data as Task
            router.go(`/task?id=${task.id}`)
        }
    })
}
const getTaskListFunction = () => {
    getTaskList(localRepository.value.id).then((res:any)=>{
        if(res.code == 200) {
            taskList.value = res.data
        }
    })
}
const getClosedTaskListFunction = () => {
    getClosedTaskList(localRepository.value.id).then((res:any)=>{
        if(res.code == 200) {
            taskList.value = res.data
        }
    })
}
const clickType = (val:boolean) => {
    selectClosed.value = val
    if(val)getClosedTaskListFunction()
    else getTaskListFunction()
}
</script>
<style scoped>
.task-page{
    width: 1280px;
    margin: 0 308.5px;
    padding: 16px 24px;
}
.operation{
    height: 30px;
    display: flex;
    justify-content: end;
}
.page-body{
    margin-top: 16px;
}
.container-header{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    padding:0 8px;
}
.container-body{
    min-height: 64px;
}

.dialog-header {
    display: flex;
    padding: 12px;
    font-size: 14px;
    color: #1F2328;
    align-items: center;
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

.btn {
    margin-right: 8px;
}
</style>