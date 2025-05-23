<template>
    <div class="body">
        <div class="head">
            <div class="breadcrumbs">
                <v-breadcrumbs :items="path?.split('/')" density="compact"></v-breadcrumbs>
            </div>
            <div class="btns">
                <commonBtn @click="uploadDialog = true">上传代码</commonBtn>
                <greenBtn><span>下载</span></greenBtn>
            </div>
        </div>
        <div class="content">
            <div v-if="isFolder">
                <repositoryCodeListComponent :key="fileList.length" :fileList="fileList"></repositoryCodeListComponent>
            </div>
            <div v-else>
                <repositoryCodeFileComponent></repositoryCodeFileComponent>
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
                    <folderListComponent :repositoryId="repositoryId" v-model="currentPath"></folderListComponent>
                    <div class="uploadInfo" v-if="uploadInfo.total!=0">
                        <div class="process">
                            <div class="process-inner" :style="`width:${uploadInfo.finished*100/uploadInfo.total}%`">

                            </div>
                        </div>
                        <div v-if="uploadInfo.finished!=uploadInfo.total">{{ `${uploadInfo.finished}/${uploadInfo.total}` }}</div>
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
<script lang="ts" setup>
import router from '@/router'
import {RepositoryFile,GetRepositoryFolderForm,UploadFileForm} from '@/api/repository/repositoryType'
import {getRepositoryFolder,uploadRepositoryFile} from '@/api/repository/repositoryApi'
import {errorAlert} from '@/utils/message'
import { ref,onMounted } from 'vue'
const repositoryId = ref<Number>()
const path = ref<String>()
const isFolder = ref<Boolean>(true)
const currentPath = ref('')
const getRepositoryFolderForm = ref<GetRepositoryFolderForm>({
    repositoryId: '',
    path: ''
})
const fileList = ref<RepositoryFile[]>([

])
const uploadDialog = ref<Boolean>(false)
const uploadFolderRef = ref()
const uploadFilesRef = ref()
onMounted(() => {
    repositoryId.value = router.currentRoute.value.query.id
    path.value = router.currentRoute.value.query.path
    isFolder.value = router.currentRoute.value.query.folder === 'true';
    getRepositoryFolderForm.value.repositoryId = repositoryId.value
    getRepositoryFolderForm.value.path = path.value
    getRepositoryFolder(getRepositoryFolderForm.value).then((res:any)=>{
        if(res.code == 200){
            fileList.value = res.data
        }
    })
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
    uploadFolderRef.value.click()
}
const uploadFiles = () => {
    uploadFilesRef.value.click()
}
const uploadInfo = ref({
    total: 0,
    finished: 0
})
const change = function (items) {
    uploadInfo.value.total = items.target.files.length
    for (let i = 0; i < items.target.files.length; i++) {
        let file = items.target.files[i];
        let uploadFileForm = {
            repositoryId: repositoryId.value,
            file: file,
            path:file.webkitRelativePath==''?`/${file.webkitRelativePath}/${file.name}`:''
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
}
</script>
<style scoped>
.body{
    width: 1897px;
}
.head{
    width: 1897px;
    height: 48px;
    padding: 16px 48px;
    display: flex;
    justify-content: space-between;
}
.breadcrumbs{
    height: 32px;
    width: 1500px;
}
.breadcrumbs v-breadcrumbs{
    padding: 0;
}
.btns{
    display: flex;
}
.content{
    width: 1865px;
    padding: 0 16px;
    margin-top: 24px;
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
.uploadInfo{
    margin-top: 16px;
    display: flex;
    width: 100%;
    height: 16px;
    padding: 0 16px;
    justify-content: space-between;
    align-items: center;
}
.process{
    position: relative;
    background-color: #D1D9E0;
    height: 4px;
    width: 80%;
    border-radius: 2px;
}
.process-inner{
    width: 0px;
    height: 4px;
    border-radius: 2px;
    background-color: #1F883D;
}
.currentPath {
    padding: 0 16px;
    display: flex;
    justify-content: start;
    align-items: center;
}
</style>