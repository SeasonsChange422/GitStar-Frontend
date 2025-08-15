<template>
    <div class="page">
        <labelComponent :text="'项目名'"></labelComponent>
        <commonInput v-model="updateProjectForm.name"></commonInput>
        <br>
        <labelComponent :text="'项目LOGO'"></labelComponent>
        <div class="input upload" @click="click" :style="`background-image:url('${updateProjectForm.logo}')`">
            +
        </div>
        <br>
        <labelComponent :text="'项目简介'"></labelComponent>
        <commonInput v-model="updateProjectForm.description"></commonInput>
        <br>
        <labelComponent :text="'可见性'"></labelComponent>
        <v-radio-group v-model="updateProjectForm.visibility">
            <v-radio :value="true">
                <template v-slot:label>
                    <div class="radio-label">
                        <div class="radio-label-icon">
                            <svg aria-hidden="true" focusable="false" class="Octicon-sc-9kayk9-0 knLhXt"
                                viewBox="0 0 24 24" width="24" height="24" fill="currentColor"
                                style="display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;">
                                <path
                                    d="M3 2.75A2.75 2.75 0 0 1 5.75 0h14.5a.75.75 0 0 1 .75.75v20.5a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1 0-1.5h5.25v-4H6A1.5 1.5 0 0 0 4.5 18v.75c0 .716.43 1.334 1.05 1.605a.75.75 0 0 1-.6 1.374A3.251 3.251 0 0 1 3 18.75ZM19.5 1.5H5.75c-.69 0-1.25.56-1.25 1.25v12.651A2.989 2.989 0 0 1 6 15h13.5Z">
                                </path>
                                <path
                                    d="M7 18.25a.25.25 0 0 1 .25-.25h5a.25.25 0 0 1 .25.25v5.01a.25.25 0 0 1-.397.201l-2.206-1.604a.25.25 0 0 0-.294 0L7.397 23.46a.25.25 0 0 1-.397-.2v-5.01Z">
                                </path>
                            </svg>
                        </div>
                        <div class="radio-label-text">
                            公开
                        </div>
                    </div>
                </template>
            </v-radio>
            <v-radio :value="false">
                <template v-slot:label>
                    <div class="radio-label">
                        <div class="radio-label-icon">
                            <svg aria-hidden="true" focusable="false" class="Octicon-sc-9kayk9-0 knLhXt"
                                viewBox="0 0 24 24" width="24" height="24" fill="currentColor"
                                style="display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;">
                                <path
                                    d="M6 9V7.25C6 3.845 8.503 1 12 1s6 2.845 6 6.25V9h.5a2.5 2.5 0 0 1 2.5 2.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 19.5v-8A2.5 2.5 0 0 1 5.5 9Zm-1.5 2.5v8a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-13a1 1 0 0 0-1 1Zm3-4.25V9h9V7.25c0-2.67-1.922-4.75-4.5-4.75-2.578 0-4.5 2.08-4.5 4.75Z">
                                </path>
                            </svg>
                        </div>
                        <div class="radio-label-text">
                            私人
                        </div>
                    </div>
                </template>
            </v-radio>
        </v-radio-group>
        <v-file-input style="visibility: hidden;" type="file" accept="image/*" ref="uploadRef" @change="change"
            v-model="file"></v-file-input>
        <div class="operation">
            <greenBtn @click="updateFunction"><span>保存</span></greenBtn>
        </div>
    </div>
</template>
<script setup lang="ts">
import { uploadPicture } from '@/api/file/fileApi'
import { onMounted, ref } from 'vue'
import router from '@/router'
import {updateProject} from '@/api/project/projectApi'
import { Project, UpdateProjectForm } from '@/api/project/projectType'
const props = defineProps({
    project: {} as Project
})
const updateProjectForm = ref<UpdateProjectForm>({})
const localPorject = ref<Project>({})
const projectId = ref()
const file = ref<File>()
const uploadRef = ref()
onMounted(() => {
    projectId.value = router.currentRoute.value.query.id
    localPorject.value = props.project
    updateProjectForm.value = JSON.parse(JSON.stringify(localPorject.value))
})
const change = () => {
    uploadPicture(file.value).then((res: any) => {
        if (res.errno == 0) {
            updateProjectForm.value.logo = res.data.url
        }
    })
}
const updateFunction = ()=>{
    if(
        updateProjectForm.value.name==localPorject.value.name&&
        updateProjectForm.value.description==localPorject.value.description&&
        updateProjectForm.value.logo==localPorject.value.logo&&
        updateProjectForm.value.visibility==localPorject.value.visibility
    ){
        return
    }
    updateProject(updateProjectForm.value).then((res:any)=>{
        if(res.code == 200){
            router.go(0)
        }
    })
}
const click = () =>{
    uploadRef.value.click()
}
</script>
<style scoped>
.page {
    width: 100%;
    min-height: 70vh;
    padding: 16px;
}
.radio-label {
    display: flex;
}

.radio-label-icon {
    fill: #59636E;
}

.radio-label-text {
    padding: 0 0 0 8px;
    font-size: 16px;
    font-weight: 300;
}
.input {
    width: 90px;
    height: 32px;
    margin: 4px 0 16px;
    padding: 5px 12px;
    background-color: #FFFFFF;
    border: #D1D9E0 1px solid;
    border-radius: 6px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    outline: none;
}
.upload{
    height: 90px;
    font-size: 32px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}
.upload:hover{
    border: #0969DA 2px solid;
    color: #0969DA;
}

.input:focus {
    border: #0969DA 2px solid;
}
.operation{
    height: 32px;
    display: flex;
    justify-content: end;
    padding: 8px;
}
</style>