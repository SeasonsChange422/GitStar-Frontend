<template>
    <div class="user-post">
        <div class="user-post-operation">
            <!-- <div class="user-post-operation-search-icon">
                <svg data-target="primer-text-field.leadingVisual" aria-hidden="true" height="16" viewBox="0 0 16 16"
                    version="1.1" width="16" data-view-component="true"
                    class="octicon octicon-search FormControl-input-leadingVisual">
                    <path
                        d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z">
                    </path>
                </svg>
            </div> -->
            <!-- <input class="user-post-operation-search" /> -->
            <div class="user-post-operation-new" @click="router.push('/newPost')">
                新建帖子
            </div>
        </div>
        <div class="user-post-list">
            <div class="user-post-list-header">

            </div>
            <div class="user-post-list-item" v-for="post in postList" :key="post.id">
                <postComponent :post="post"></postComponent>
                <v-divider></v-divider>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {Page} from '@/api/common/pageType'
import {Post} from '@/api/post/postType'
import {getPostListByToken} from '@/api/post/postApi'
import router from '@/router'
const page = ref<Page>({
    current: 2,
    size: 500
})
const postList = ref<Post[]>([

])
onMounted(()=>{
    getPostListFunc()
})
const getPostListFunc = () => {
    getPostListByToken(page.value).then((res:any)=>{
        if(res.code == 200){
            postList.value = res.data
        }
    })
}
</script>
<style scoped>
.user-post {
    width: 100%;
    height: auto;
    margin: 10px 0 0;
}

.user-post-operation {
    position: relative;
    width: 100%;
    height: 32px;
    display: flex;
}

.user-post-operation-search-icon {
    position: absolute;
    left: 8px;
    top: 8px;
    fill: #59636E;
}

.user-post-operation-search {
    width: 785px;
    height: 32px;
    padding: 5px 32px;
    background-color: #FFFFFF;
    border: #D1D9E0 1px solid;
    border-radius: 6px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    outline: none;
}

.user-post-operation-search:focus {
    border: #0969DA 2px solid;
}

.user-post-operation-new {
    height: 32px;
    width: auto;
    margin-left: 8px;
    padding: 0px 12px;
    font-size: 14px;
    line-height: 32px;
    font-weight: 600;
    border-radius: 6px;
    letter-spacing: -0.5px;
    cursor: pointer;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    background-color: #1F883D;
}

.user-post-operation-new:hover {
    background-color: #1C8139;
}

.user-post-list {
    width: 100%;
    height: auto;
    border-radius: 6px;
    margin-top: 20px;
    border: #D1D9E0 1px solid;
    padding-bottom: 8px;
}

.user-post-list-header {
    width: 100%;
    height: 65px;
    padding: 16px;
    border-bottom: #D1D9E0 1px solid;
    border-radius: 6px 6px 0 0;
    background-color: #F6F8FA;
}

.user-post-list-item {
    width: 100%;
    height: 64px;
    padding: 6px;
}
</style>