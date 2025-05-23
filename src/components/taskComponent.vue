<!--
 * @Author: Dhx
 * @Date: 2025-05-15 19:17:57
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\taskComponent.vue
-->
<template>
    <div class="container">
        <div class="icon">
            <labelComponent :fill="props.fill" :dArray="icon[localTask.closed?(localTask.type=='COMPLETED'?'completed':'terminate'):'open']"></labelComponent>
        </div>
        <div>
            <div class="title">
                <routerLink :to="`/task?id=${localTask.id}`">{{ localTask.title }}</routerLink>
            </div>
            <div class="createTime">
                {{ `创建于：${localTask.createTime}` }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Task } from '@/api/task/taskType'
import { ref, onMounted } from 'vue'
const props = defineProps({
    task: {
        default: {
            title: '加载中',
            createTime: '加载中',
            closed: false
        }
    },
    fill: {
        default: '#1F883D'
    }
})
const icon = ref({
    "open": [
        'M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
        'M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z'
    ],
    "completed": [
        'M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z',
        'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z'
    ],
    "terminate": [
        'M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm9.78-2.22-5.5 5.5a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l5.5-5.5a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z'
    ]
})
const localTask = ref<Task>({

})
onMounted(() => {
    localTask.value = props.task
})
</script>
<style scoped>
.container {
    display: flex;
    height: 64px;
    width: 100%;
    padding: 0 8px;
    border-bottom: #D1D9E0 1px solid;
}

.title {
    height: 32px;
    padding: 8px 0 0;
}

.title a {
    font-size: 16px;
    color: #1F2328;
    font-weight: 700;
    text-decoration: none;
}

.title a:hover {
    color: #0969DA;
    text-decoration: underline;
}

.icon {
    padding: 8px 0 0;
}

.createTime {
    height: 28px;
    padding: 0 8px 0 0;
    color: #59636E;
    font-size: 12px;
}
</style>