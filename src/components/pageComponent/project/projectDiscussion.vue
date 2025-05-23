<template>
    <commonContainer class="discussion" :scroll="false">
        <template v-slot:body>
            <div v-if="postList && postList.length != 0">
                <postComponent class="item" v-for="post in postList" :key="post.id" :post="post"></postComponent>
            </div>
        </template>
    </commonContainer>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import router from '@/router'
import { Post } from '@/api/post/postType'
import { getPostOfProject } from '@/api/project/projectApi'
const projectId = ref<Number>()

const postList = ref<Post[]>([

])
onMounted(() => {
    projectId.value = router.currentRoute.value.query.id
    getPostFunction()
})
const getPostFunction = () => {
    getPostOfProject(projectId.value).then((res: any) => {
        if (res.code == 200) {
            postList.value = res.data
        }
    })
}
</script>
<style scoped>
.discussion {
    width: 1280px;
    height: 100%;
    margin: 0 308.5px;
    /* padding: 0 16px; */
}
.item{
    border-bottom: #D1D9E0 1px solid;
}
</style>