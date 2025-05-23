<template>
    <div class="project-container" :key="currentProject">
        <img class="project-container-image" :src="currentProject.logo" />
        <div class="project-container-text">
            <div class="project-container-text-name">
                <router-link :to="'/project?id=' + currentProject.id ">
                    {{ currentProject.name }}
                </router-link>
            </div>
            <div class="project-container-text-time">
                {{ currentProject.createTime}}
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Project } from '@/api/project/projectType'
const props = defineProps({
    project: {} as Project,
})
const currentProject = ref<Project>({
    
})
onMounted(()=>{
    currentProject.value = props.project
})
</script>
<style scoped>
.project-container {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
}

.project-container-image {
    height: 64px;
    width: 64px;
    border-radius: 8px;
}

.project-container-text {
    margin-left: 16px;
    height: 80px;
    width: calc(100% - 80px);
    padding: 12px;
}

.project-container-text-name {
    height: 32px;
    font-size: 22px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}

.project-container-text-name a {
    text-decoration: none;
    color: black;
}

.project-container-text-name a:hover {
    text-decoration: underline;
}

.project-container-text-time {
    height: 14px;
    font-size: 14px;
    font-weight: 300;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}
</style>