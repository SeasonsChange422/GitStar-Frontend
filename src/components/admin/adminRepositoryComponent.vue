<!--
 * @Author: Dhx
 * @Date: 2025-05-16 18:46:22
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\admin\adminRepositoryComponent.vue
-->
<template>
    <dialogComponent v-model="computedValue">
        <commonContainer :scroll="false">
            <template v-slot:header>
                <div class="header">
                    评论 {{repository.id}}
                </div>
            </template>
            <template v-slot:body>
                <div class="body">
                    <labelComponent :text="'仓库id'"></labelComponent>
                    <div class="info">
                        {{ repository.id }}
                    </div>
                    <labelComponent :text="'仓库名'"></labelComponent>
                    <div class="info">
                        {{ repository.name }}
                    </div>
                    <labelComponent :text="'仓库简介'"></labelComponent>
                    <div class="info">
                        {{ repository.description }}
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="footer">
                    <commonBtn :confirm="true" @click="deleteRepositoryFunction()">
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
import {Repository} from '@/api/repository/repositoryType'
import {getRepositoryInfo} from '@/api/repository/repositoryApi'
import {delRepository} from '@/api/admin/adminApi'
import router from '@/router'
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    repositoryId:{
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:modelValue'])
const localRepositoryId = ref('')
const repository = ref<Repository>({})
const computedValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
const getRepositoryInfoFunction = () => {
    getRepositoryInfo(localRepositoryId.value).then((res:any)=>{
        if(res.code == 200){ 
            repository.value = res.data
        }
    })
}
const deleteRepositoryFunction = () => {
    delRepository(localRepositoryId.value).then((res:any)=>{
        if(res.code == 200) {
            router.go(0)
        }
    })
}
onMounted(()=>{
    localRepositoryId.value = props.repositoryId
    getRepositoryInfoFunction()
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