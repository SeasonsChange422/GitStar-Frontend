<!--
 * @Author: Dhx
 * @Date: 2025-02-28 00:58:02
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\litePostComponent.vue
-->
<template>
    <div class="post">
        <div class="post-title">
            <router-link :to="`/post?id=${currentPost.id}`">
                {{ currentPost.title }}
            </router-link>
        </div>
        <div class="post-createTime">
            {{ currentPost.createTime }}
        </div>
    </div>
    <v-divider class="divider"></v-divider>

</template>
<script lang="ts" setup>
import { Post } from '@/api/post/postType'
import { onMounted, ref } from 'vue';
import { getTimeAgo } from '@/utils/time'
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
.post{
    position: relative;
    height: 24px;
    width: 100%;
    display: flex;
}
.post-title{
    height: 24px;
    font-size: 14px;
    overflow: hidden;
    width: 70%;
    padding: 0 12px;
    text-overflow: ellipsis;
}
.post-createTime{
    height: 24px;
    width: 30%;
    font-size: 12px;
    text-align: right;
    padding: 0 12px;
}
.divider{
    position: relative;
    width: 95%;
    left: 50%;
    transform: translate(-50%);
    margin-bottom: 10px;
}
</style>