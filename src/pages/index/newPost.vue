<template>
    <div class="new-post">
        <div class="new-post-title">
            发布新帖子
        </div>
        <br>
        <v-divider></v-divider>
        <span class="new-post-tips">带星号栏必须填写 (*).</span>
        <br>
        <label class="label">
            帖子标题 *
        </label>
        <br>
        <input class="input" v-model="post.title">
        <br>
        <label class="label">
            关联项目 *
        </label>
        <br>
        <div style="position: relative;">
            <input class="input" v-model="searchKey" @input="searchFunction" @click="choosed=false" @blur="blur">
            <div class="records" v-show="choosed==false">
                <div class="records-item" v-for="item in records" :key="item.id" @click="choose(item)" :title="item.description">
                    {{item.name}}
                </div>
            </div>
        </div>
        
        <br>
        <label class="label">
            帖子内容
        </label>
        <EditorComponent v-model="post.context"></EditorComponent>
        <v-divider></v-divider>
        <div class="new-post-operation">
            <button class="new-post-operation-btn" @click="newPostFunction"
                :style="'cursor:' + (disabled ? 'not-allowed' : 'pointer')">
                新建帖子
            </button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import {NewPostForm} from '@/api/post/postType'
import {Project} from '@/api/post/projectType'
import {searchProject} from '@/api/project/projectApi'
import {newPost} from '@/api/post/postApi'
import {errorAlert,successAlert} from '@/utils/message'
import router from '@/router'
import { title } from 'process';
const post = ref<NewPostForm>({
    title: '',
    projectId: '',
    context: '',
})

const blur = () => {
    setTimeout(()=>{
        choosed.value = true
    },300)
}
const newPostFunction = () => {
    if(post.value.title == ''|| post.value.projectId == ''){
        errorAlert('标题和关联项目不能为空')
        return
    }
    disabled.value = true
    newPost(post.value).then((res:any)=>{
        if(res.code == 200){
            successAlert("发表成功")
            setTimeout(()=>{
                router.go(0)
            },1000)
        }
    })
}
const disabled = ref(false)
const records = ref<Project[]>([])
const searchFunction = () => {
    searchProject(searchKey.value).then((res:any)=>{
        if(res.code == 200) {
            records.value = []
            records.value = res.data
        }
    })
}
const choosed = ref(true)
const choose = (item:Project)=>{
    post.value.projectId = item.id
    console.log(post.value.projectId)
    searchKey.value = item.name
    choosed.value = true
}
const searchKey = ref('')
</script>
<style scoped>
.new-post{
    width: 1280px;
    height: 100%;
    margin: 0 308.5px;
    padding: 16px;
}
.new-post-title {
    width: 100%;
    height: 36px;
    font-size: 24px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-weight: 500;
    margin-bottom: 8px;
}
.new-post-tips {
    height: 19px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    color: #1F2328;
    font-style: italic;
    margin-bottom: 16px;
}
.new-post-operation {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: end;
}
.new-post-operation-btn {
    height: 32px;
    width: auto;
    margin-top: 8px;
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

.new-post-operation-btn:hover {
    background-color: hsl(137, 64%, 31%);
}
.records{
    position: absolute;
    min-height: 100px;
    max-height: 300px;
    width: 150px;
    padding: 0 8px;
    border-radius: 8px;
    background-color: white;
    border: black 1px solid;
    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 100;
}
.records-item{
    height: 32px;
    width: 100%;
    border-radius: 6px;
    cursor: pointer;
}
.records-item:hover{
    background-color: #F6F8FA;
}
</style>