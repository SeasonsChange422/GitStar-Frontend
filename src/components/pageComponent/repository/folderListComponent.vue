<!--
 * @Author: Dhx
 * @Date: 2025-05-08 20:27:19
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\pageComponent\repository\folderListComponent.vue
-->
<template>
    <div class="folderList" :key="props.modelValue">
        <folderComponent v-for="folder in fileList.filter((file) => { return file.folder })" :key="folder"
            :file="folder" :currentPath="props.modelValue" @click="clickFolder(folder)"></folderComponent>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { RepositoryFile, GetRepositoryFolderForm } from '@/api/repository/repositoryType'
import { getRepositoryFolder } from '@/api/repository/repositoryApi'

const props = defineProps({
    repositoryId: {
        type: String
    },
    modelValue: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:modelValue'])
const getRepositoryFolderForm = ref<GetRepositoryFolderForm>({
    repositoryId: '',
    path: ''
})
const fileList = ref<RepositoryFile[]>([])
const clickFolder = (folder: RepositoryFile) => {
    console.log(folder.path)
    const newPath = folder.path.substring(folder.path.indexOf('/') + 1)
    emit('update:modelValue', newPath)
}
watch(() => props.modelValue, (newPath:String) => {
    getRepositoryFolderForm.value.path = newPath
    getRepositoryFolderFunction()
})
onMounted(() => {
    getRepositoryFolderForm.value.repositoryId = props.repositoryId
    getRepositoryFolderFunction()
})
const getRepositoryFolderFunction = () => {
    getRepositoryFolder(getRepositoryFolderForm.value).then((res: any) => {
        if (res.code == 200) {
            fileList.value = res.data
        }
    })
}
</script>
<style scoped>
.folderList {
    width: 100%;
}
</style>