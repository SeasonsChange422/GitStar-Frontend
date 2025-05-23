<!--
 * @Author: Dhx
 * @Date: 2025-02-27 16:18:14
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\postComponent.vue
-->
<template>
    <div class="post">
        <div class="post-title">
            <div>
                <router-link :to="`/post?id=${currentPost.id}`">
                    {{ currentPost.title }}
                </router-link>
            </div>
            <div class="post-createTime">
                {{ '发布于：' + currentPost.createTime }}
            </div>
        </div>
        <div class="stats">
            <smallLabelComponent
                :dArray="['M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z']"
                :text="currentPost.commentCount"
            ></smallLabelComponent>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Post } from '@/api/post/postType'
import { onMounted, ref } from 'vue';
import { getTimeAgo } from '@/utils/time'
import { text } from 'stream/consumers';
const props = defineProps({
    post: {} as Post
})
const currentPost = ref<Post>({

})
onMounted(() => {
    currentPost.value = props.post
    currentPost.value.createTime = getTimeAgo(currentPost.value.createTime)
})
</script>
<style scoped>
.post {
    display: flex;
    height: 64px;
    padding: 8px;
    justify-content: space-between;
}

.post-title {
    height: 48px;
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.post-title a{
    text-decoration: none;
}
.post-title a:hover{
    color: #0969DA;
    text-decoration: underline;
}

.post-createTime {
    height: 24px;
    width: 100%;
    font-size: 12px;
}
.stats{
    display: flex;
    align-items: center;
}
</style>