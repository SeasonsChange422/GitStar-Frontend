<!--
 * @Author: Dhx
 * @Date: 2025-04-08 02:47:40
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\repositoryCodeListComponent.vue
-->
<!--
 * @Author: Dhx
 * @Date: 2025-04-08 02:47:40
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\repositoryCodeListComponent.vue
-->
<template>
    <CommonContainer :scroll="false">
        <template v-slot:body>
            <div class="code-fileList" v-if="currentFileList && currentFileList.length != 0">
                <repositoryOverviewFileComponent v-for="file in currentFileList" :key="file.path" :file="file">
                </repositoryOverviewFileComponent>
            </div>
            <div class="empty" v-else>
                <div class="empty-center">
                    <div>还没有代码</div>
                    <span class="upload-btn" @click="upload">立即上传</span>
                    <input type="file" style="visibility: hidden;" ref="uploadRef" webkitdirectory @change="change">
                </div>
            </div>
        </template>
    </CommonContainer>
</template>
<script lang="ts" setup>
import { RepositoryFile } from '@/api/repository/repositoryType'
import { uploadRepositoryFile } from '@/api/repository/repositoryApi'
import router from '@/router'
import { onMounted, ref } from 'vue'
const props = defineProps({
    fileList: {
        type: Array,
    }
})
const currentFileList = ref<RepositoryFile[]>([])
const uploadRef = ref()
const repositoryId = ref<Number>()
const upload = () => {
    uploadRef.value.click()
}
onMounted(() => {
    repositoryId.value = router.currentRoute.value.query.id
    currentFileList.value = props.fileList
})
const change = function (items) {
    for (let i = 0; i < items.target.files.length; i++) {
        let file = items.target.files[i];
        let uploadFileForm = {
            repositoryId: repositoryId.value,
            file: file
        }
        uploadRepositoryFile(uploadFileForm).then((res: any) => {
            if (res.code == 200) {
                //
            }
        })
    }
}
</script>
<style scoped>
.code {
    width: 100%;
    border: #D1D9E0 1px solid;
    border-radius: 6px;
    overflow: hidden;
}

.code-head {
    height: 52px;
    padding: 4px;
    background-color: #F6F8FA;
    border-bottom: #D1D9E0 1px solid;
    border-radius: 6px 6px 0 0;
}

.code-fileList {
    width: 100%;
}

.empty {
    position: relative;
    width: 100%;
    height: 500px;
    text-align: center;
    align-items: center;
}

.empty-center {
    position: relative;
    height: 100px;
    width: 160px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}

.upload-btn {
    border: #D1D9E0 1px solid;
    border-radius: 6px;
    height: 30px;
    line-height: 30px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-size: 14px;
    padding: 4px 12px;
    cursor: pointer;
}

.upload-btn:hover {
    background-color: #EAEDF0;
}
</style>