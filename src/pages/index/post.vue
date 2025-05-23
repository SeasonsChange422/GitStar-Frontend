<template>
    <div class="post-page" ref="scrollbarRef">
        <div class="post-page-left">
            <div class="post-head">
                <div>
                    <div class="post-title">
                        {{ post.title }}
                    </div>
                    <div class="post-time">
                        {{ post.createTime }}
                    </div>
                </div>
                <div class="feedback">
                    <hoverContainer>
                        <template v-slot:item>
                            <v-icon icon="mdi-dots-vertical"></v-icon>
                        </template>
                        <template v-slot:box>
                            <div class="box">
                                <transparentBtn @click="displayPostFeedback">
                                    <span>举报帖子</span>
                                </transparentBtn>
                                <transparentBtn @click="delPostFunction" :confirm="true" v-if="localUser.id == author.id">
                                            <span>删除</span>
                                        </transparentBtn>
                            </div>
                        </template>
                    </hoverContainer>
                </div>
            </div>
            <v-divider></v-divider>
            <div class="post-context">
                <Editor style="width: 100%;background-color: transparent;" v-if="post && post.context"
                    v-model="post.context" :defaultConfig="{ readOnly: true, scroll: false }" :mode="'default'"
                    @onCreated="(createdEditor: any) => {
                        editor = Object.seal(createdEditor);
                    }" />
            </div>
            <div class="new-comment">
                <input class="new-comment-input" v-model="newCommentForm.text" />
                <button class="new-comment-btn" @click="newCommentFunction" :disabled="newCommentForm.text == ''"
                    :style="'cursor:' + (newCommentForm.text == '' ? 'not-allowed' : 'pointer')">
                    发表
                </button>
            </div>
            <v-list lines="three" item-props>
                <div v-for="(item,index) in commentList" :key="item.id">
                    <v-list-item :title="item.title" :subtitle="item.subtitle" :prepend-avatar="item.prependAvatar" v-if="!item.inset">
                        <template v-slot:subtitle="{ subtitle }">
                            <div v-html="subtitle"></div>
                        </template>
                        <template v-slot:append>
                            <hoverContainer>
                                <template v-slot:item>
                                    <v-icon icon="mdi-dots-vertical"></v-icon>
                                </template>
                                <template v-slot:box>
                                    <div class="box">
                                        <transparentBtn @click="displayCommentFeedback(index)">
                                            <span>举报评论</span>
                                        </transparentBtn>
                                    </div>
                                </template>
                            </hoverContainer>
                        </template>
                    </v-list-item>
                    <v-divider v-if="item.inset"></v-divider>

                </div>


            </v-list>
        </div>
        <div class="post-page-right">
            <div class="label">
                作者
            </div>
            <br>
            <userComponent :user="author"></userComponent>
            <br>
            <div class="label">
                相关项目
            </div>
            <projectComponent :project="currentProject" v-if="currentProject&&currentProject.id != ''"></projectComponent>
            <div class="target-box">
                <div class="target-box__title">
                    目录
                </div>
                <div style="height:500px;overflow-y: scroll">
                    <div class="target-box__target" v-for="(heading, index) in headings"
                        :style="{ paddingLeft: heading.level * 20 + 'px', width: 'calc(100%-' + heading.level * 20 + 'px)', fontSize: 19 - heading.level + 'px' }"
                        :key="index" @click="to(heading)" v-html="heading.text">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <feedbackComponent v-model="feedbackDialog" :newFeedbackForm="newFeedbackForm"></feedbackComponent>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Post } from '@/api/post/postType'
import { Page } from '@/api/common/pageType'
import { Editor } from '@wangeditor/editor-for-vue'
import { getPostInfo, getAuthor, getProjectOfPost,delPost } from '@/api/post/postApi'
import { NewCommentForm, Comment } from '@/api/comment/commentType'
import { newComment, getRootCommentList } from '@/api/comment/commentApi'
import { User } from '@/api/user/userType'
import { Project } from '@/api/project/projectType'
import router from '@/router'
import { successAlert } from '@/utils/message'
import { NewFeedbackForm } from '@/api/feedback/feedbackType'
import {storage} from '@/utils/storage'
const feedbackDialog = ref(false)
const post = ref<Post>({

})
const author = ref<User>({

})
const localUser = ref<User>({

})
const newFeedbackForm = ref<NewFeedbackForm>({
    id: '',
    type: '',
    objectId: '',
    feedback: ''
})
const currentProject = ref<Project>({
    id: ''
})
const newCommentForm = ref<NewCommentForm>({
    text: '',
    rootId: '-1'
})
const scrollbarRef = ref<any>()
const headings = ref<any[]>([])
const page = ref<Page>({
    current: 1,
    size: 10
})
const commentList = ref<any[]>([

])
const postId = ref<String>('')
const displayPostFeedback = () => {
    newFeedbackForm.value.type = 'post'
    newFeedbackForm.value.objectId = postId.value
    feedbackDialog.value = true
}
const displayCommentFeedback = (index: number) => {
    newFeedbackForm.value.type = 'comment'
    newFeedbackForm.value.objectId = commentList.value[index].id
    feedbackDialog.value = true
}
const pushComment = (comment: Comment) => {
    commentList.value.push({
        prependAvatar: comment.userAvatar,
        title: comment.userNickName,
        subtitle: comment.content,
        id: comment.commentId
    })
    commentList.value.push({ type: 'divider', inset: true })
}
const getAuthorFunction = () => {
    getAuthor(postId.value).then((res: any) => {
        if (res.code == 200) {
            author.value = res.data

        }
    })
}
const getProjectFunction = () => {
    getProjectOfPost(postId.value).then((res: any) => {
        if (res.code == 200) {
            currentProject.value = res.data
        }
    })
}
const newCommentFunction = () => {
    newComment(newCommentForm.value, postId.value).then((res: any) => {
        if (res.code == 200) {
            newCommentForm.value.text = ''
            successAlert('发表成功')
            setTimeout(() => {
                router.go(0)
            }, 1000)
        }
    })
}
const getRootCommentListFunction = () => {
    getRootCommentList(page.value, postId.value).then((res: any) => {
        if (res.code == 200) {
            const commentList: Comment[] = res.data.records
            if(commentList==null)return
            for (let i = 0; i < commentList.length; i++) {
                pushComment(commentList[i])
            }
        }
    })
}
const delPostFunction = () => {
    delPost({postId:post.value.id}).then((res:any)=>{
        if(res.code == 200) {
            router.push('/home')
        }
    })
}
onMounted(() => {
    localUser.value = storage.get('user')
    postId.value = router.currentRoute.value.query.id
    getPostInfoFunction()
    getRootCommentListFunction()
    getAuthorFunction()
    getProjectFunction()
})
const getPostInfoFunction = () => {
    getPostInfo(postId.value).then((res: any) => {
        if (res.code == 200) {
            post.value = res.data
            setTimeout(() => {
                getDirectory()
            }, 1000)
        }
    })
}
const DirectoryElements = ref<Element[]>([])

const getDirectory = function () {

    // 获取页面中所有的标题元素 h1 到 h6
    const allHeadings = document.querySelectorAll('.post-context h1, h2, h3, h4, h5, h6');

    allHeadings.forEach((heading, index) => {
        DirectoryElements.value.push(heading)
        const tagName = heading.tagName.toLowerCase() // 获取标签名，例如 'h1', 'h2', ...
        const headingLevel = parseInt(tagName[1]) // 获取标题级别
        let currentLevel = headings.value
        currentLevel[index] = {
            level: headingLevel,
            text: heading.innerHTML.trim(),
        }
    })
}

const to = function (target: any) {
    //     // scrollbarRef.value.scrollTo(0, DirectoryElements.value[index].getBoundingClientRect().top - 200)
    //     // document.querySelector('v-main')!.scrollTo()
}
</script>
<style scoped>
.post-page {
    width: 1280px;
    height: 100%;
    margin: 0 308.5px;
    padding: 16px;
    display: flex;
}

.post-title {
    font-size: 32px;
    font-weight: 500;
    letter-spacing: -0.5px;
}

.post-time {
    font-size: 12px;
    font-weight: 300;
}

.feedback {}

.box {
    position: relative;
    /* height: 100px; */
    min-width: 100px;
    border: #D1D9E0 1px solid;
    background-color: white;
    border-radius: 6px;
    padding: 4px;
    box-shadow: #D1D9E0 0 0 5px 1px;
}


.post-page-left {
    width: 896px;
    height: 100%;
}

.post-head {
    display: flex;
    justify-content: space-between;
    align-commentList: center;
}

.post-context {
    padding: 24px;
    width: 896px;
    min-height: 300px;
    /* overflow: hidden; */

}

.post-context {
    word-break: break-word !important;
    word-wrap: break-word !important;
}

.post-context * {
    word-break: break-word !important;
    word-wrap: break-word !important;
    /* display: block !important; */
    overflow: hidden !important;
    white-space: normal !important;
    text-align: left;
    /* color: rgba(255, 255, 255, 0.7); */
}

.post-context img {
    max-width: 100% !important;
    height: auto !important;
}

.post-context * a {
    /* text-decoration: none; */
}

.post-page-right {
    width: 296px;
    height: 100%;
    margin-left: 24px;
}

.label {
    font-size: 21px;
    font-weight: 600;
    margin-top: 10px;
}

.new-comment {
    position: relative;
    width: 100%;
    height: 32px;
    display: flex;
}

.new-comment-input {
    width: 830px;
    height: 32px;
    padding: 5px 8px;
    background-color: #FFFFFF;
    border: #D1D9E0 1px solid;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
}

.new-comment-input:focus {
    border: #0969DA 2px solid;
}

.new-comment-btn {
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

.new-comment-btn:hover {
    background-color: #1C8139;
}

.target-box {
    position: relative;
    margin-top: 16px;
    /* position: fixed;
    width: 296px;
    right: 308.5px;
    top: 150px; */
    /* /* left: 50%; */
    /* transform: translate(-50%); */
    background-color: #F6F8FA;
    /* box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 1px; */
    border-radius: 5px;
    /* margin-top: 10px; */
    border: #D1D9E0 1px solid;
    overflow: hidden;
    padding: 0 0;
    max-height: 500px;
    /* overflow: scroll; */
}

.target-box__title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-weight: 600;
    font-size: 20px;
    background-color: #F6F8FA;
    overflow: hidden;
    color: black;
    text-align: left;
    /* position: sticky; */
    top: 0;
}

.target-box__target {
    width: 100%;
    /* height: 40px; */
    line-height: 40px;
    font-size: 18px;
    text-align: left;
    color: black;
    user-select: none;
    cursor: pointer;
    overflow: hidden;
    word-break: break-word;
    word-wrap: break-word;
}

.target-box__target:hover {
    background-color: #EAEDF0;
}
</style>