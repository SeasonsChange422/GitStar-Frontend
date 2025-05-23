<!--
 * @Author: Dhx
 * @Date: 2025-05-09 21:58:44
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\releaseComponent.vue
-->
<template>
    <div class="release-container">
        <commonContainer :scroll="false">
            <template v-slot:header>
                <div class="contaier-header">
                    {{ `发行时间：${localRelease.createTime}` }}
                    <hoverContainer>
                    <template v-slot:item>
                        <v-icon icon="mdi-dots-vertical"></v-icon>
                    </template>
                    <template v-slot:box>
                        <div class="box">
                            <transparentBtn @click="displayReleaseFeedback()">
                                <span>举报</span>
                            </transparentBtn>
                        </div>
                    </template>
                </hoverContainer>
                </div>
            </template>
            <template v-slot:body>
                <div class="release-container-body">
                    <Editor style="width: 100%;background-color: transparent;" v-if="localRelease && localRelease.id"
                        v-model="localRelease.description" :defaultConfig="{ readOnly: true, scroll: false }"
                        :mode="'default'" @onCreated="(createdEditor: any) => {
                            editor = Object.seal(createdEditor);
                        }" />
                </div>
            </template>
            <template v-slot:footer>
                <div class="file" @click="download">
                    <svg data-v-72399c87="" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="17"
                        data-view-component="true" class="octicon octicon-table Underlineuser-nav-octicon">
                        <path data-v-72399c87=""
                            d="M3.5 1.75v11.5c0 .09.048.173.126.217a.75.75 0 0 1-.752 1.298A1.748 1.748 0 0 1 2 13.25V1.75C2 .784 2.784 0 3.75 0h5.586c.464 0 .909.185 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v8.586A1.75 1.75 0 0 1 12.25 15h-.5a.75.75 0 0 1 0-1.5h.5a.25.25 0 0 0 .25-.25V4.664a.25.25 0 0 0-.073-.177L9.513 1.573a.25.25 0 0 0-.177-.073H7.25a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5h-3a.25.25 0 0 0-.25.25Zm3.75 8.75h.5c.966 0 1.75.784 1.75 1.75v3a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75v-3c0-.966.784-1.75 1.75-1.75ZM6 5.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 6 5.25Zm.75 2.25h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM8 6.75A.75.75 0 0 1 8.75 6h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 8 6.75ZM8.75 3h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM8 9.75A.75.75 0 0 1 8.75 9h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 8 9.75Zm-1 2.5v2.25h1v-2.25a.25.25 0 0 0-.25-.25h-.5a.25.25 0 0 0-.25.25Z">
                        </path>
                    </svg>
                    <span style="width: 80%;" v-if="localRelease&&localRelease.id">{{ localRelease.file.substring(localRelease.file.lastIndexOf('/')+1) }}</span>
                    <span>点击下载</span>
                </div>
            </template>
        </commonContainer>
    </div>
    <feedbackComponent v-model="feedbackDialog" :newFeedbackForm="newFeedbackForm"></feedbackComponent>
</template>
<script setup lang="ts">
import { Editor } from '@wangeditor/editor-for-vue'
import { Release } from '@/api/release/releaseType'
import { NewFeedbackForm } from '@/api/feedback/feedbackType'

import { onMounted, ref } from 'vue';
const props = defineProps({
    release: {} as Release,
    projectId: {
        type:Number
    }
})
const feedbackDialog = ref(false)

const newFeedbackForm = ref<NewFeedbackForm>({
    type: '',
    objectId: '',
    feedback: ''
})
const localRelease = ref<Release>({})
const download = ()=>{
    window.open(localRelease.value.file)
}
const displayReleaseFeedback = () => {
    newFeedbackForm.value.type = 'release'
    newFeedbackForm.value.objectId = localRelease.value.id
    feedbackDialog.value = true
}
onMounted(() => {
    localRelease.value = props.release
})
</script>
<style scoped>
.release-container {
    width: 800px;
    margin-bottom: 24px;
}

.contaier-header {
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
.file {
    padding: 0 24px;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 12px;
    font-size: 16px;
    font-weight: 500;
}
.file svg{
    scale: 2;
}

.file:hover {
    background-color: #D1D9E0;
}

.release-container-body {
    font-size: 14px;
    font-weight: 500;
    flex-wrap: wrap;
    padding: 24px;
    min-height: 100px;
    color: black;
}

.release-container-body {
    word-break: break-word !important;
    word-wrap: break-word !important;
}

.release-container-body * {
    word-break: break-word !important;
    word-wrap: break-word !important;
    /* display: block !important; */
    overflow: hidden !important;
    white-space: normal !important;
    text-align: left;
    /* color: rgba(255, 255, 255, 0.7); */
}

.release-container-body img {
    max-width: 100% !important;
    height: auto !important;
}

.release-container-body * a {
    /* text-decoration: none; */
}
</style>