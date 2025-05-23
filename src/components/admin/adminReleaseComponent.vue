<!--
 * @Author: Dhx
 * @Date: 2025-05-16 21:08:28
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\admin\adminReleaseComponent.vue
-->
<template>
    <dialogComponent v-model="computedValue">
        <commonContainer :scroll="false">
            <template v-slot:header>
                <div class="header">
                    发行版本 {{release.id}}
                </div>
            </template>
            <template v-slot:body>
                <div class="body">
                    <labelComponent :text="'发行版本ID'"></labelComponent>
                    <div class="info">
                        {{ release.id }}
                    </div>
                    <labelComponent :text="'详情'"></labelComponent>
                    <div class="info">
                        <div class="post-context">
                            <Editor style="width: 100%;background-color: transparent;" v-if="release && release.description"
                                v-model="release.description" :defaultConfig="{ readOnly: true, scroll: false }"
                                :mode="'default'" @onCreated="(createdEditor: any) => {
                                    editor = Object.seal(createdEditor);
                                }" />
                        </div>
                    </div>
                    <labelComponent :text="'文件'"></labelComponent>
                    <div class="info">
                        {{ release.file }}<div class="download" @click="download">下载</div>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="footer">
                    <commonBtn :confirm="true" @click="deleteReleaseFunction()">
                        <span>
                            删除
                        </span>
                    </commonBtn>
                </div>
            </template>
        </commonContainer>
    </dialogComponent>
</template>
<script setup lang="ts">
import {ref,computed,onMounted} from 'vue'
import {Release} from '@/api/release/releaseType'
import {getReleaseInfo} from '@/api/release/releaseApi'
import {delRelease} from '@/api/admin/adminApi'
import { Editor } from '@wangeditor/editor-for-vue'
import router from '@/router'
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    releaseId:{
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:modelValue'])
const localReleaseId = ref('')
const release = ref<Release>({})
const computedValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
const download = ()=>{
    window.open(release.value.file)
}
const getReleaseInfoFunction = () => {
    getReleaseInfo(localReleaseId.value).then((res:any)=>{
        if(res.code == 200){ 
            release.value = res.data
        }
    })
}
const deleteReleaseFunction = () => {
    delRelease(localReleaseId.value).then((res:any)=>{
        if(res.code == 200) {
            router.go(0)
        }
    })
}
onMounted(()=>{
    localReleaseId.value = props.releaseId
    getReleaseInfoFunction()
})
</script>
<style scoped>
.header{
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
}
.body{
    padding: 16px;
}
.avatar{
    height: 96px;
    width: 96px;
    border-radius: 48px;
}
.info{
    padding: 16px;
    overflow: hidden;;
    word-wrap: break-word;
    
}
.footer{
    height: 100%;
    display: flex;
    align-items: center;
    padding: 8px 0;
    justify-content: end;
    gap: 8px;
}
.post-context {
    width: 100%;
    min-height: 300px;
    /* overflow: hidden; */
    border: #D1D9E0 1px solid;
    padding: 8px;
}

.post-context {
    word-break: break-word !important;
    word-wrap: break-word !important;
}

.post-context * {
    word-break: break-word !important;
    word-wrap: break-word !important;
    /* display: block !important; */
    overflow: hidden !important;
    white-space: normal !important;
    text-align: left;
    /* color: rgba(255, 255, 255, 0.7); */
}

.post-context img {
    max-width: 100% !important;
    height: auto !important;
}

.post-context * a {
    /* text-decoration: none; */
}
.download{
    color: #0969DA;
    cursor: pointer;
}
.download:hover{
    text-decoration: underline;
}
</style>