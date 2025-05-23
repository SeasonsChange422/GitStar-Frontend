<!--
 * @Author: Dhx
 * @Date: 2025-02-28 00:16:28
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\homeProjectComponent.vue
-->
<template>
    <div class="home-project">
        <div class="title">
            <LiteProjectComponent :project="currentProject" v-if="currentProject.id != ''"></LiteProjectComponent>
        </div>
        <div class="description">
            {{ currentProject.description }}
        </div>
        <div class="time">
            {{ currentProject.createTime }}
        </div>
        <v-divider></v-divider>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Project } from '@/api/project/projectType'
import { getTimeAgo } from '@/utils/time'
import LiteProjectComponent from './liteProjectComponent.vue';
const props = defineProps({
    project: {} as Project,
})

const currentProject = ref<Project>({
    id: ''
})
onMounted(() => {
    currentProject.value = props.project
    currentProject.value.createTime = getTimeAgo(currentProject.value.createTime)
})

</script>
<style scoped>
.home-project {
    padding: 8px;
    width: 100%;
}

.title {
    height: 21px;
    width: 100%;
}
.title * {
    font-weight: 600;
}

.description {
    font-size: 14px;
    font-weight: 300;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    margin-top: 8px;
    text-overflow: ellipsis;
}

.time {
    margin-top: 8px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    font-weight: 300;
}
</style>