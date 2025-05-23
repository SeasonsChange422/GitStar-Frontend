<!--
 * @Author: Dhx
 * @Date: 2025-04-02 19:28:35
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\pageComponent\repository\repositoryOverview.vue
-->
<template>
    <div class="repository-overview-container">
        <div class="repository-overview-container-header">
            <div class="repository-overview-container-header-center">
                <div class="repository-overview-container-header-center-left">
                    <div class="repository-name">
                        {{ localRepository.name }}
                    </div>
                    <v-chip density='compact'>公开</v-chip>
                </div>
                <div class="repository-overview-container-header-center-right">
                    <commonBtn @click="starRepositoryFunction()">
                        <LabelComponent
                            :dArray="localRepository.starred ?
                                ['M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z'] :
                                ['M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z']"
                            :text="'收藏'" :fill="localRepository.starred ? '#EAC54F' : ''"></LabelComponent>
                    </commonBtn>
                </div>
                <hoverContainer>
                    <template v-slot:item>
                        <v-icon icon="mdi-dots-vertical"></v-icon>
                    </template>
                    <template v-slot:box>
                        <div class="box">
                            <transparentBtn @click="displayRepositoryFeedback()">
                                <span>举报仓库</span>
                            </transparentBtn>
                        </div>
                    </template>
                </hoverContainer>
            </div>
            <div class="divider"></div>

        </div>
        <div class="repository-overview-container-content">
            <div class="repository-overview-container-content-left">
                <div class="repository-overview-container-content-left-operation">
                    <commonBtn @click="uploadDialog = true">上传代码</commonBtn>
                    <greenBtn @click="downloadRepositoryFunction()"><span>下载</span></greenBtn>
                </div>
                <div class="repository-overview-container-content-left-code">
                    <repositoryCodeListComponent :key="fileList.length" :fileList="fileList">
                    </repositoryCodeListComponent>
                </div>
                <CommonContainer class="repository-overview-container-content-left-README" :scroll="false">
                    <template v-slot:header>
                        <div class="README-title">
                            <LabelComponent
                                :dArray="['M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z']"
                                :text="'README'"></LabelComponent>
                        </div>
                    </template>
                    <template v-slot:body>
                        <div class="markdown-body" v-html="marked.parse((READMEContent as any))">

                        </div>
                    </template>
                </CommonContainer>
            </div>
            <div class="repository-overview-container-content-right">
                <div class="details">
                    <div class="details-head">
                        <div class="details-head-title">
                            详情
                        </div>
                        <a @click="() => { editDialog = true }">
                            <svg aria-label="Edit repository metadata" role="img" height="16" viewBox="0 0 16 16"
                                version="1.1" width="16" data-view-component="true"
                                class="octicon octicon-gear float-right">
                                <path
                                    d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0Zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 0 0 0 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 0 0 1.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 0 0 0-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 0 0-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 0 0-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 0 0-1.142 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9.5 8a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 8Z">
                                </path>
                            </svg>
                        </a>
                    </div>
                    <div class="details-content">
                        {{ localRepository.description }}
                    </div>
                    <div class="stats-list">
                        <div class="stats-list-item">
                            <LabelComponent
                                :dArray="['M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z']"
                                :text="'Readme'"></LabelComponent>
                        </div>
                        <div class="stats-list-item">
                            <LabelComponent
                                :dArray="['M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z']"
                                :text="localRepository.star + ' 收藏'"></LabelComponent>
                        </div>
                        <div class="stats-list-item">
                            <LabelComponent
                                :dArray="['M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z']"
                                :text="localRepository.view + ' 浏览'"></LabelComponent>
                        </div>
                        <div class="stats-list-item">
                            <LabelComponent
                                :dArray="[
                                    'M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z',
                                    'M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z']"
                                :text="localRepository.download + ' 下载'"></LabelComponent>
                        </div>
                    </div>
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
                    <folderListComponent :repositoryId="repositoryId" v-model="currentPath"></folderListComponent>
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
    <dialogComponent v-model="editDialog">
        <CommonContainer class="dialog">
            <template v-slot:header>
                <div class="dialog-header">
                    <span>编辑仓库信息</span>
                    <div class="close" @click="editDialog = false">
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
                    <LabelComponent :dArray="[]" :text="'仓库名'"></LabelComponent>
                    <commonInput v-model="updateRepositoryForm.name"></commonInput>
                    <LabelComponent :dArray="[]" :text="'简介'"></LabelComponent>
                    <commonInput v-model="updateRepositoryForm.description"></commonInput>
                </div>
            </template>
            <template v-slot:footer>
                <div class="dialog-footer">
                    <commonBtn class="btn" @click="editDialog = false">
                        <div style="padding: 0 12px;">
                            取消
                        </div>
                    </commonBtn>
                    <GreenBtn class="btn" @click="updateRepositoryFunction()">
                        <div style="padding: 0 12px;">
                            保存
                        </div>
                    </GreenBtn>
                </div>
            </template>
        </CommonContainer>
    </dialogComponent>
    <input type="file" style="visibility: hidden;" ref="uploadFolderRef" webkitdirectory @change="change">
    <input type="file" style="visibility: hidden;" ref="uploadFilesRef" multiple @change="change">
    <feedbackComponent v-model="feedbackDialog" :newFeedbackForm="newFeedbackForm"></feedbackComponent>
</template>
<script lang="ts" setup>
import { RepositoryFile, GetRepositoryFolderForm, UploadFileForm, Repository } from '@/api/repository/repositoryType'
import { getRepositoryFolder, uploadRepositoryFile, getRepositoryREADME, updateRepository, starRepository,downloadRepository } from '@/api/repository/repositoryApi'
// import { }
import { marked } from 'marked';
import { base64_to_utf8 } from '@/utils/encode'
import router from '@/router'
import { errorAlert } from '@/utils/message'
import { onMounted, ref } from 'vue'
import CommonContainer from '../../common/container/commonContainer.vue';
import { UpdateRepositoryForm } from '@/api/repository/repositoryType'
import CommonBtn from '../../common/button/commonBtn.vue';
import { NewFeedbackForm } from '@/api/feedback/feedbackType'
const updateRepositoryForm = ref<UpdateRepositoryForm>({

})
const props = defineProps({
    repository: {} as Repository
})
const feedbackDialog = ref(false)
const newFeedbackForm = ref<NewFeedbackForm>({
    type: '',
    objectId: '',
    feedback: ''
})
const localRepository = ref<Repository>({})
const repositoryId = ref<Number>()
const getRepositoryFolderForm = ref<GetRepositoryFolderForm>({
    repositoryId: '',
    path: ''
})
const READMEContent = ref<String>('')
const fileList = ref<RepositoryFile[]>([

])
const currentPath = ref('')
const starDisabled = ref<Boolean>(false)
const uploadDialog = ref<Boolean>(false)
const uploadFolderRef = ref()
const uploadFilesRef = ref()
const editDialog = ref<Boolean>(false)
marked.setOptions({
    breaks: true,     // 换行符转换为 <br>
    gfm: true,        // 启用 GitHub Flavored Markdown
});
onMounted(() => {
    repositoryId.value = router.currentRoute.value.query.id
    localRepository.value = props.repository
    getRepositoryFolderForm.value.repositoryId = repositoryId.value
    initUpdateRepositoryForm();
    getRepositoryFolderFunction();
    getRepositoryREADMEFunction()
})
const displayRepositoryFeedback = () => {
    newFeedbackForm.value.type = 'repository'
    newFeedbackForm.value.objectId = repositoryId.value
    feedbackDialog.value = true
}
const back = () => {
    const pathSegments = currentPath.value.split('/').filter(Boolean)
    if (pathSegments.length <= 1) {
        currentPath.value = ''
        return
    }
    pathSegments.pop()
    currentPath.value = pathSegments.join('/') + '/'
}
const initUpdateRepositoryForm = () => {
    updateRepositoryForm.value.repositoryId = localRepository.value.id
    updateRepositoryForm.value.name = localRepository.value.name
    updateRepositoryForm.value.description = localRepository.value.description
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
const fileBase64 = ref<String>('')
const download = function(){
    downloadBase64File(
        fileBase64.value, 
        `${repositoryId.value}.zip`, 
        'text/plain;charset=utf-8'
      );
}
const downloadBase64File = function(base64Data, fileName, mimeType){
  const base64Prefix = `data:${mimeType || 'application/octet-stream'};base64,`;
  const fullBase64 = base64Data.startsWith('data:') ? base64Data : base64Prefix + base64Data;
  const byteCharacters = atob(fullBase64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType || 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
    window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
const change = function (items) {
    uploadInfo.value.total = items.target.files.length
    for (let i = 0; i < items.target.files.length; i++) {
        let file = items.target.files[i];
        let uploadFileForm = {
            repositoryId: repositoryId.value,
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
}

const getRepositoryFolderFunction = () => {
    getRepositoryFolder(getRepositoryFolderForm.value).then((res: any) => {
        if (res.code == 200) {
            fileList.value = res.data
        }
    })
}
const getRepositoryREADMEFunction = () => {
    getRepositoryREADME(repositoryId.value).then((res: any) => {
        if (res.code == 200) {
            READMEContent.value = base64_to_utf8(res.data)
        }
    })
}
const updateRepositoryFunction = () => {
    updateRepository(updateRepositoryForm.value).then((res: any) => {
        if (res.code == 200) {
            router.go(0)
        }
    })
}
const starRepositoryFunction = () => {
    if (starDisabled.value == true) return
    starDisabled.value = true
    setTimeout(() => {
        starDisabled.value = false
    }, 5000)
    starRepository(repositoryId.value).then((res: any) => {
        if (res.code == 200) {
            localRepository.value.starred = !localRepository.value.starred
        }
    })
}
const downloadRepositoryFunction = () => {
    downloadRepository(repositoryId.value).then((res:any)=>{
        if(res.code == 200) {
            fileBase64.value = res.data
            download()
        }
    })
}
</script>
<style scoped>
.repository-overview-container-header {
    /* height: 30px; */
    padding: 16px 0 0;
}

.repository-overview-container-header-center {
    width: 1280px;
    margin: 0 308.5px 16px;
    padding: 0 32px;
    display: flex;
}

.repository-overview-container-header-center-left {
    width: 750px;
    display: flex;
}

.repository-overview-container-header-center-right {
    width: 450px;
    display: flex;
    justify-content: right;
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

.repository-name {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-size: 20px;
    font-weight: 500;
    margin-right: 8px;
    font-stretch: ultra-condensed;
}

.divider {
    width: 1232px;
    height: 1px;
    background-color: #D1D9E0;
    position: relative;
    left: 50%;
    transform: translate(-50%);
}

.repository-overview-container-content {
    width: 1280px;
    margin: 0 308.5px;
    padding: 0 32px;
    display: flex;
    min-height: 100vh;
}

.repository-overview-container-content-left {
    width: 896px;

}

.repository-overview-container-content-left-operation {
    width: 896px;
    height: 56px;
    padding: 8px 0 16px;
    display: flex;
    align-items: center;
    justify-content: end;
}

.markdown-body {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.markdown-body pre code {
    font-size: 14px;
    line-height: 1.5;
}

.markdown-body img {
    max-width: 100%;
    height: auto;
}

.repository-overview-container-content-left-code {
    width: 896px;
}

.repository-overview-container-content-left-README {
    width: 896px;
    margin-top: 24px;
}

.README-title {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
}

.repository-overview-container-content-right {
    width: 296px;
    margin-left: 24px;
}

.details {
    width: 296px;
    padding: 16px 0;
}

.details-head {
    width: 296px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.details-head a {
    cursor: pointer;
}

.details-head a:hover {
    fill: #0969DA;
}

.details-head-title {
    font-size: 18px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}

.dialog {}

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

.uploadInfo {
    margin-top: 16px;
    display: flex;
    width: 100%;
    height: 16px;
    padding: 0 16px;
    justify-content: space-between;
    align-items: center;
}

.process {
    position: relative;
    background-color: #D1D9E0;
    height: 4px;
    width: 80%;
    border-radius: 2px;
}

.process-inner {
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


.details-content {
    margin: 16px 0;
    font-size: 16px;
    color: #1F2328;
}

.stats-list {
    width: 296px;
}

.stats-list-item {
    height: 21px;
    margin-top: 8px;
}

.stats-list-item * {
    color: #626D78;
}
</style>