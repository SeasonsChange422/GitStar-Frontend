<template>
    <dialogComponent v-model="uploadDialog">
        <commonContainer>
            <template v-slot:header>
                <div class="dialog-header">
                    <span>发行版本</span>
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
                    <labelComponent :text="'说明'"></labelComponent>
                    <editorComponent v-model="newReleaseForm.description"></editorComponent>
                    <br>
                    <labelComponent :text="'压缩包或安装包'"></labelComponent>
                    <input type="file" @change="change">
                </div>
            </template>
            <template v-slot:footer>
                <div class="dialog-footer">
                    <commonBtn class="btn" @click="uploadDialog = false">
                        <div style="padding: 0 12px;">
                            取消
                        </div>
                    </commonBtn>
                    <GreenBtn class="btn" @click="newReleaseFunction()">
                        <div style="padding: 0 12px;">
                            保存
                        </div>
                    </GreenBtn>
                </div>
            </template>
        </commonContainer>
    </dialogComponent>
    <div class="release">
        <div class="release-head">
            <greenBtn @click="uploadDialog=true"><span>发行版本</span></greenBtn>
        </div>
        <div class="release-body">
            <releaseComponent v-for="release in releaseList" :key="release.id" :release="release" :projectId="projectId"></releaseComponent>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {NewReleaseForm,Release} from '@/api/release/releaseType'
import {newRelease,getReleaseOfProject} from '@/api/release/releaseApi'
import router from '@/router'
import {uploadPicture} from '@/api/file/fileApi'
const uploadDialog = ref(false)
const newReleaseForm = ref<NewReleaseForm>({

})
const projectId = ref()
const file = ref<File>()
const releaseList = ref<Release>()
const change = function (item) {
    file.value = item.target.files[0]
    uploadPicture(file.value).then((res:any)=>{
        if(res.errno == 0) {
            newReleaseForm.value.file = res.data.url
        }
    })
}
const newReleaseFunction = () =>{
    newRelease(newReleaseForm.value).then((res:any)=>{
        if(res.code == 200) {
            router.go(0)
        }
    })
}
const getReleaseOfProjectFunction = () =>{
    getReleaseOfProject(projectId.value).then((res:any)=>{
        if(res.code == 200){
            releaseList.value = res.data
        }
    })
}
onMounted(()=>{
    projectId.value = router.currentRoute.value.query.id
    newReleaseForm.value.projectId = projectId.value
    getReleaseOfProjectFunction()
})
</script>
<style scoped>
.release {
    width: 1280px;
    height: 100%;
    margin: 0 308.5px;
    padding: 16px;
}
.release-head{
    height: 50px;
    display: flex;
    justify-content: end;
    align-items: center;
}
.release-body{
    width: 100%;
    display: flex;
    justify-content: center;
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
.btn {
    margin-right: 8px;
}
</style>