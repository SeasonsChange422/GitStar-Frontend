<!--
 * @Author: Dhx
 * @Date: 2025-05-16 22:36:18
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\pages\index\search.vue
-->
<template>
    <div class="search-page">
        <div class="left">
            <labelComponent :text="'选项'" class="title"></labelComponent>
            <transparentBtn style="justify-content: start;"
                @click="router.push(`/search?key=${searchInput}&type=project`);searchFunction();">
                <labelComponent :dArray="[
                    'm8.878.392 5.25 3.045c.54.314.872.89.872 1.514v6.098a1.75 1.75 0 0 1-.872 1.514l-5.25 3.045a1.75 1.75 0 0 1-1.756 0l-5.25-3.045A1.75 1.75 0 0 1 1 11.049V4.951c0-.624.332-1.201.872-1.514L7.122.392a1.75 1.75 0 0 1 1.756 0ZM7.875 1.69l-4.63 2.685L8 7.133l4.755-2.758-4.63-2.685a.248.248 0 0 0-.25 0ZM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432Zm6.25 8.271 4.625-2.683a.25.25 0 0 0 .125-.216V5.677L8.75 8.432Z',
                ]" :text="'项目'"></labelComponent>
            </transparentBtn>
            <transparentBtn style="justify-content: start;"
                @click="router.push(`/search?key=${searchInput}&type=post`);searchFunction()">
                <labelComponent :dArray="[
                    'M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.061l-2.574 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1ZM1.5 2.75v5.5c0 .138.112.25.25.25h1a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h3.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25Zm13 2a.25.25 0 0 0-.25-.25h-.5a.75.75 0 0 1 0-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 14.25 12H14v1.543a1.458 1.458 0 0 1-2.487 1.03L9.22 12.28a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l2.22 2.22v-2.19a.75.75 0 0 1 .75-.75h1a.25.25 0 0 0 .25-.25Z',
                ]" :text="'帖子'"></labelComponent>
            </transparentBtn>
        </div>
        <div class="right">
            <input class="search" v-model="searchInput"
                @keyup.enter="router.push(`/search?key=${searchInput}&type=project`);searchFunction()">
            <div class="result">
                <div>
                    <searchPostComponent v-for="post in postList" :key="post.id" :post="post"></searchPostComponent>
                </div>
                <div>
                    <homeProjectComponent v-for="project in projectList" :key="project.id" :project="project"></homeProjectComponent>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import router from '@/router'
import { searchPost } from '@/api/post/postApi'
import { searchProject } from '@/api/project/projectApi'
import {Post} from '@/api/post/postType'
import {Project} from '@/api/project/projectType'
const searchInput = ref('')
const searchType = ref('')
const postList = ref<Post[]>([])
const projectList = ref<Project[]>([])
onMounted(() => {
    searchType.value = router.currentRoute.value.query.type || 'project'
    searchInput.value = router.currentRoute.value.query.key
    searchFunction()
})
const searchFunction = () => {
    if (searchType.value == 'project') {
        searchProject(searchInput.value).then((res: any) => {
            if (res.code == 200) {
                projectList.value = res.data
            }
        })
    } else if (searchType.value == 'post') {
        searchPost(searchInput.value).then((res: any) => {
            if (res.code == 200) {
                postList.value = res.data
            }
        })
    }
}
</script>
<style scoped>
.search-page {
    width: 1280px;
    height: 100%;
    margin: 0 308.5px;
    padding: 16px;
    min-height: 100vh;
    display: flex;
    gap: 16px;
}

.left {
    width: 25%;
}

.title {
    margin-bottom: 16px;
}

.right {
    width: 75%;
}

.search {
    height: 44px;
    padding: 11px 12px;
    border-radius: 12px;
    width: 760px;
    outline: none;
    border: #D1D9E0 1px solid;
}

.search:focus {
    outline: #0969DA 2px solid;
}

.result {
    padding: 16px;
}
</style>