<template>
    <dialogComponent v-model="computedValue">
        <commonContainer :scroll="false">
            <template v-slot:header>
                <div class="header">
                    {{ computeTitle() }}
                </div>
            </template>
            <template v-slot:body>
                <div class="body">
                    <labelComponent :text="computeLabel()"></labelComponent>
                    <commonInput v-model="localNewFeedbackForm.feedback"></commonInput>
                </div>
            </template>
            <template v-slot:footer>
                <div class="footer">
                    <commonBtn @click="$emit('update:modelValue', false)">
                        <span>
                            取消
                        </span>
                    </commonBtn>
                    <greenBtn @click="newFeedbackFunction()">
                        <span>
                            提交
                        </span>
                    </greenBtn>
                </div>
            </template>
        </commonContainer>
    </dialogComponent>
</template>
<script setup lang="ts">
import { onMounted, ref,computed } from 'vue'
import{ NewFeedbackForm} from '@/api/feedback/feedbackType'
import{ newFeedback} from '@/api/feedback/feedbackApi'
import {message} from '@/utils/message'
import router from '@/router'
const props = defineProps({
    newFeedbackForm:{
        default: {
            type: 'common',
            objectId: '',
            feedback: ''
        } as NewFeedbackForm
    },
    modelValue: {
        type: Boolean,
        required: true
    }
})
const emit = defineEmits(['update:modelValue'])
const computedValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
const disabled = ref(false)
const localNewFeedbackForm = ref<NewFeedbackForm>({
    type: '',
    objectId: '',
    feedback: ''
})
const E2C = ref({
    'common':'反馈',
    'post':'举报帖子',
    'project':'举报项目',
    'repository':'举报仓库',
    'user':'举报用户',
    'comment':'举报评论',
})
const computeTitle = () =>{
    return E2C.value[localNewFeedbackForm.value.type]
}
const computeLabel = () =>{
    return localNewFeedbackForm.value.type=='common'?'反馈意见':'举报原因'
}
const newFeedbackFunction = () => {
    if(disabled.value===true){
        return
    }
    disabled.value = true
    newFeedback(localNewFeedbackForm.value).then((res:any)=>{
        if(res.code == 200) {
            message.success("提交成功")
            setTimeout(()=>{
                router.go(0)
            })
        } else {
            disabled.value = false
            message.error(res.msg)
        }
    })
}
onMounted(()=>{
    localNewFeedbackForm.value = props.newFeedbackForm
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
.footer{
    height: 100%;
    display: flex;
    align-items: center;
    padding: 8px 0;
    justify-content: end;
    gap: 8px;
}
</style>