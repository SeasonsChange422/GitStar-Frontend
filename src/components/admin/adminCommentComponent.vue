<template>
    <dialogComponent v-model="computedValue">
        <commonContainer :scroll="false">
            <template v-slot:header>
                <div class="header">
                    评论 {{comment.id}}
                </div>
            </template>
            <template v-slot:body>
                <div class="body">
                    <labelComponent :text="'用户ID'"></labelComponent>
                    <div class="info">
                        {{ comment.userId }}
                    </div>
                    <labelComponent :text="'用户头像'"></labelComponent>
                    <img :src="comment.userAvatar" class="avatar">
                    <labelComponent :text="'用户名称'"></labelComponent>
                    <div class="info">
                        {{ comment.userNickName }}
                    </div>
                    <labelComponent :text="'评论ID'"></labelComponent>
                    <div class="info">
                        {{ comment.commentId }}
                    </div>
                    <labelComponent :text="'评论内容'"></labelComponent>
                    <div class="info">
                        {{ comment.content }}
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="footer">
                    <commonBtn :confirm="true" @click="deleteCommentFunction()">
                        <span>
                            删除
                        </span>
                    </commonBtn>
                </div>
            </template>
        </commonContainer>
    </dialogComponent>
</template>
<script setup lang="ts">
import {ref,computed,onMounted} from 'vue'
import {Comment} from '@/api/comment/commentType'
import {getCommentInfo} from '@/api/comment/commentApi'
import {delComment} from '@/api/admin/adminApi'
import router from '@/router'
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    commentId:{
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:modelValue'])
const localCommentId = ref('')
const comment = ref<Comment>({})
const computedValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
const getCommentInfoFunction = () => {
    getCommentInfo(localCommentId.value).then((res:any)=>{
        if(res.code == 200){ 
            comment.value = res.data
        }
    })
}
const deleteCommentFunction = () => {
    delComment(localCommentId.value).then((res:any)=>{
        if(res.code == 200) {
            router.go(0)
        }
    })
}
onMounted(()=>{
    localCommentId.value = props.commentId
    getCommentInfoFunction()
})
</script>
<style scoped>
.header{
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
}
.body{
    padding: 16px;
}
.avatar{
    height: 96px;
    width: 96px;
    border-radius: 48px;
}
.info{
    padding: 16px;
    overflow: hidden;;
    word-wrap: break-word;
    
}
.footer{
    height: 100%;
    display: flex;
    align-items: center;
    padding: 8px 0;
    justify-content: end;
    gap: 8px;
}
</style>