<!--
 * @Author: Dhx
 * @Date: 2025-02-26 22:35:07
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\pageComponent\project\projectRepository.vue
-->
<template>
    <div class="reposiotry-nav-list">
        <greenBtn @click="newRepositoryDialog = true"><span>新建仓库</span></greenBtn>
    </div>
    <div class="repository-list">
        <projectRepositoryComponent v-for="repository in repositoryList" :key="repository.id" :repository="repository">
        </projectRepositoryComponent>
    </div>
    <dialogComponent v-model="newRepositoryDialog">
        <commonContainer>
            <template v-slot:header>
                <div class="dialog-header">
                    <span>新建仓库</span>
                    <div class="close" @click="newRepositoryDialog = false">
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
                    <commonInput v-model="newRepositoryForm.name"></commonInput>
                    <LabelComponent :dArray="[]" :text="'简介'"></LabelComponent>
                    <commonInput v-model="newRepositoryForm.description"></commonInput>
                </div>
            </template>
            <template v-slot:footer>
                <div class="dialog-footer">
                    <commonBtn class="btn" @click="newRepositoryDialog = false">
                        <div style="padding: 0 12px;">
                            取消
                        </div>
                    </commonBtn>
                    <greenBtn class="btn" @click="newRepositoryFunction()">
                        <div style="padding: 0 12px;">
                            新建
                        </div>
                    </greenBtn>
                </div>
            </template>
        </commonContainer>

    </dialogComponent>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Project } from '@/api/project/projectType'
import { Page } from '@/api/common/pageType'
import { User } from '@/api/user/userType'
import { Repository, NewRepositoryForm } from '@/api/repository/repositoryType'
import { newRepository, getRepositoryListByProjectId } from '@/api/repository/repositoryApi'
import { getUserOfProject } from '@/api/project/projectApi'
import { uploadPicture } from '@/api/file/fileApi'
import router from '@/router'
import { storage } from '@/utils/storage'
const fileInput = ref()
const user = ref<User>({
    id: '-1'
})
const localUser = ref<User>({

})
const newRepositoryForm = ref<NewRepositoryForm>({

})
const newRepositoryDialog = ref(false)
const page = ref<Page>({
    current: 1,
    size: 500
})
const repositoryList = ref<Repository[]>([])
const file = ref<File>()
const projectId = ref<Number>()
onMounted(() => {
    localUser.value = storage.get('user')
    projectId.value = router.currentRoute.value.query.id
    newRepositoryForm.value.projectId = projectId.value
    getUserFunction()
    getRepositoryListByProjectIdFunction()
})

const getRepositoryListByProjectIdFunction = () => {
    getRepositoryListByProjectId(page.value, projectId.value).then((res: any) => {
        if (res.code == 200) {
            repositoryList.value = res.data.records
        }
    })
}
const getUserFunction = () => {
    getUserOfProject(projectId.value).then((res: any) => {
        if (res.code == 200) {
            user.value = res.data
        }
    })
}
const newRepositoryFunction = () => {
    newRepository(newRepositoryForm.value).then((res: any) => {
        if (res.code == 200) {
            setTimeout(() => {
                router.go(0)
            }, 500)
        }
    })
}
</script>
<style scoped>
.reposiotry-nav-list {
    width: 1280px;
    height: 50px;
    margin: 0 308.5px;
    padding: 8px;
    align-items: center;
    display: flex;
    justify-content: end;
}

.repository-list {
    width: 1417px;
    margin: 0 240px;
    border-radius: 6px;
    margin-top: 20px;
    display: flex;
    justify-content: start;
    gap: 24px;
    flex-wrap: wrap;
}


.header-btn {
    height: 28px;
    width: auto;
    margin-left: 8px;
    padding: 0px 12px;
    font-size: 14px;
    line-height: 28px;
    font-weight: 600;
    border-radius: 6px;
    letter-spacing: -0.5px;
    cursor: pointer;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    background-color: #1F883D;
}

.header-btn:hover {
    background-color: #1C8139;
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