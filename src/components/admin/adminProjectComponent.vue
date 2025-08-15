<template>
    <dialogComponent v-model="computedValue">
        <commonContainer :scroll="false">
            <template v-slot:header>
                <div class="header">
                    评论 {{project.id}}
                </div>
            </template>
            <template v-slot:body>
                <div class="body">
                    <labelComponent :text="'项目ID'"></labelComponent>
                    <div class="info">
                        {{ project.id }}
                    </div>
                    <labelComponent :text="'项目LOGO'"></labelComponent>
                    <img :src="project.logo" class="avatar">
                    <labelComponent :text="'项目名'"></labelComponent>
                    <div class="info">
                        {{ project.name }}
                    </div>
                    <labelComponent :text="'项目简介'"></labelComponent>
                    <div class="info">
                        {{ project.description }}
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="footer">
                    <commonBtn :confirm="true" @click="deleteProjectFunction()">
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
import {Project} from '@/api/project/projectType'
import {getProjectInfo} from '@/api/project/projectApi'
import {delProject} from '@/api/admin/adminApi'
import router from '@/router'
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    projectId:{
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:modelValue'])
const localProjectId = ref('')
const project = ref<Project>({})
const computedValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
const getProjectInfoFunction = () => {
    getProjectInfo(localProjectId.value).then((res:any)=>{
        if(res.code == 200){ 
            project.value = res.data
        }
    })
}
const deleteProjectFunction = () => {
    delProject(localProjectId.value).then((res:any)=>{
        if(res.code == 200) {
            router.go(0)
        }
    })
}
onMounted(()=>{
    localProjectId.value = props.projectId
    getProjectInfoFunction()
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