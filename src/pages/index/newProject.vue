<template>
    <div class="new-project">
        <div class="new-project-title">
            创建一个新项目
        </div>
        <v-divider></v-divider>
        <span class="new-project-tips">带星号栏必须填写 (*).</span>
        <br>
        <label class="label">
            项目LOGO
        </label>
        <br>
        <div class="input upload" @click="click" :style="`background-image:url('${project.logo}')`">
            +
        </div>
        <br>
        <label class="label">
            项目名称 *
        </label>
        <br>
        <input class="input" v-model="project.name">
        <span class="check" v-if="check"> 请填写该内容</span>
        <br>
        <label class="label">
            项目描述
        </label>
        <br>
        <input class="input" style="width: 100%;" v-model="project.description">
        <v-divider></v-divider>

        <v-radio-group v-model="project.visibility">
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
        <v-divider></v-divider>
        <div class="new-project-operation">
            <button class="new-project-operation-btn" @click="newProjectFunction"
                :style="'cursor:' + (disabled ? 'not-allowed' : 'pointer')">
                新建项目
            </button>
        </div>
    </div>
        <v-file-input style="visibility: hidden;" type="file" accept="image/*" ref="uploadRef" @change="change" v-model="file"></v-file-input>

</template>
<script lang="ts" setup>
import { successAlert, errorAlert, infoAlert, warningAlert } from '@/utils/message'
import { ref } from 'vue';
import { NewProjectForm } from '@/api/project/projectType'
import router from '@/router'
import { newProject } from '@/api/project/projectApi'
import {uploadPicture} from '@/api/file/fileApi'
const project = ref<NewProjectForm>({
    name: '',
    visibility: true,
    logo: '',
    description: ''
})
const file = ref<File>()
const uploadRef = ref()
const disabled = ref(false)
const check = ref(false)
const newProjectFunction = () => {
    if (disabled.value) return
    if (project.value.name == '') {
        check.value = true
        return
    }
    newProject(project.value).then((res: any) => {
        if (res.code == 200) {
            disabled.value = true
            successAlert('新建成功!')
            setTimeout(() => {
                router.push('/project?id=' + res.data.id)
            }, 1000)
        } else {
            errorAlert(res.msg)
        }
    })
}
const click = () =>{
    uploadRef.value.click()
}
const change= () => {
    uploadPicture(file.value).then((res:any)=>{
        if(res.errno == 0) {
            project.value.logo = res.data.url
        }
    })
}
</script>
<style scoped>
.new-project {
    height: auto;
    width: 768px;
    margin: 40px 564.5px;
    padding: 0 32px;
}

.new-project-title {
    width: 100%;
    height: 36px;
    font-size: 24px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-weight: 500;
    margin-bottom: 8px;
}

.new-project-tips {
    height: 19px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    color: #1F2328;
    font-style: italic;
    margin-bottom: 16px;
}

.check {
    color: #F44336;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}

.label {
    height: 21px;
    margin: 0 0 8px;
    font-size: 14px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}

.input {
    width: 180px;
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
    height: 180px;
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

.new-project-operation {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: end;
}

.new-project-operation-btn {
    height: 32px;
    width: auto;
    margin-top: 8px;
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

.new-project-operation-btn:hover {
    background-color: #1C8139;
}
</style>