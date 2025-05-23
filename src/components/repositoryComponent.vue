<template>

    <div class="repository">
        <div class="repository-name">
            {{ currentRepository.name }}
        </div>
        <div class="repository-time">
            {{ currentRepository.createTime }}
        </div>
        <button class="btn" @click="download">下载</button>

    </div>
</template>
<script lang="ts" setup>

import { Repository } from '@/api/repository/repositoryType'
import { onMounted } from 'vue';
import {getTimeAgo} from '@/utils/time'
import router from '@/router'
import { ref } from 'vue';
const props = defineProps({
    repository: {} as Repository
})
onMounted(() => {
    currentRepository.value = props.repository
    currentRepository.value.createTime = getTimeAgo(currentRepository.value.createTime)
})
const download = () => {
    window.open(currentRepository.value.description)
}
const currentRepository = ref<Repository>({})
</script>
<style scoped>
.repository-name {
    height: 24px;
    width: 45%;
    font-size: 12px;
    font-weight: 600;
}
.repository-time{
    height: 24px;
    width: 45%;
    font-size: 12px;
    font-weight: 500;
}

.repository {
    height: 24px;
    padding: 8px;
    display: flex;
}
.btn {
    height: 24px;
    width: auto;
    margin-left: 8px;
    padding: 0px 12px;
    font-size: 14px;
    line-height: 28px;
    font-weight: 600;
    border-radius: 6px;
    letter-spacing: -0.5px;
    cursor: pointer;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    background-color: #1F883D;
}

.btn:hover {
    background-color: #1C8139;
}
</style>