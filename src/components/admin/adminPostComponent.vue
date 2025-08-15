<template>
    <dialogComponent v-model="computedValue">
        <commonContainer :scroll="false">
            <template v-slot:header>
                <div class="header">
                    帖子 {{ post.id }}
                </div>
            </template>
            <template v-slot:body>
                <div class="body">
                    <labelComponent :text="'标题'"></labelComponent>
                    <div class="info">
                        {{ post.title }}
                    </div>
                    <labelComponent :text="'内容'"></labelComponent>
                    <div class="info">
                        <div class="post-context">
                            <Editor style="width: 100%;background-color: transparent;" v-if="post && post.context"
                                v-model="post.context" :defaultConfig="{ readOnly: true, scroll: false }"
                                :mode="'default'" @onCreated="(createdEditor: any) => {
                                    editor = Object.seal(createdEditor);
                                }" />
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="footer">
                    <commonBtn :confirm="true" @click="deletePostFunction()">
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
import { ref, computed, onMounted } from 'vue'
import { Post } from '@/api/post/postType'
import { getPostInfo } from '@/api/post/postApi'
import { Editor } from '@wangeditor/editor-for-vue'
import { delPost } from '@/api/admin/adminApi'
import router from '@/router'
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    postId: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:modelValue'])
const localPostId = ref('')
const post = ref<Post>({})
const computedValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
const getPostInfoFunction = () => {
    getPostInfo(localPostId.value).then((res: any) => {
        if (res.code == 200) {
            post.value = res.data
        }
    })
}
const deletePostFunction = () => {
    delPost(localPostId.value).then((res: any) => {
        if (res.code == 200) {
            router.go(0)
        }
    })
}
onMounted(() => {
    localPostId.value = props.postId
    getPostInfoFunction()
})
</script>
<style scoped>
.header {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
}

.body {
    padding: 16px;
}

.avatar {
    height: 96px;
    width: 96px;
    border-radius: 48px;
}

.info {
    padding: 16px;
}

.footer {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 8px 0;
    justify-content: end;
    gap: 8px;
}
.post-context {
    width: 100%;
    min-height: 300px;
    /* overflow: hidden; */
    border: #D1D9E0 1px solid;
    padding: 8px;
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

</style>