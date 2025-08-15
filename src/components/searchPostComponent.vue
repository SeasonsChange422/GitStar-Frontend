<template>
    <div class="post-container">
        <div class="title" v-if="localPost&&localPost.title">
            <routerLink :to="`/post?id=${localPost.id}`">
                {{ localPost.title }}
            </routerLink>
        </div>
        <div class="info">
            <div class="user" v-if="author&&author.id">
                <img class="avatar" :src="author.avatar">
                <div class="nickname">
                    {{ author.nickname }}
                </div>
            </div>
            <div class="time" v-if="localPost&&localPost.createTime">
                {{ `${getTimeAgo(localPost.createTime)}发布` }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {Post} from '@/api/post/postType'
import {User} from '@/api/user/userType'
import {getAuthor} from '@/api/post/postApi'
import {getTimeAgo} from '@/utils/time'
const props = defineProps({
    post: {
        title: '',
        createTime: ''
    } as Post
})
const author = ref<User>()
const localPost = ref<Post>()
onMounted(()=>{
    localPost.value = props.post
    getAuthorFunction()
})
const getAuthorFunction = () =>{ 
    getAuthor(localPost.value.id).then((res:any)=>{
        if(res.code == 200 ){
            author.value = res.data
        }
    })
}
</script>
<style scoped>
.post-container{
    width: 100%;
    border-bottom: #D1D9E0 1px solid;
}
.title{
    height: 36px;
    padding: 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;
}
.title a{
    text-decoration: none;
}
.title a:hover{
    color: #0969DA;
    text-decoration: underline;
}
.info{
    height: 24px;
    padding: 4px;
    display: flex;
    justify-content: start;
    gap: 16px;
    align-items: center;
    margin-bottom: 8px;
}
.user{
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;
}
.time{
    font-size: 12px;
}
.avatar{
    height: 12px;
    width: 12px;
    border-radius: 6px;
}
.nickname{
    font-size: 12px;
}
</style>