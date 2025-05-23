<template>
    <div class="tag" v-if="localTag&&localTag.id" :class="{ 'cursor-pointer': interactive }">
        {{ localTag.name }}
    </div>
</template>
<script setup lang="ts">
import { Tag } from "@/api/tag/tagType";
import { onMounted, ref } from "vue";
const props = defineProps({
    tag: {} as Tag,
    interactive: {
        type: Boolean,
        default: true
    }
})
const localTag = ref<Tag>()
onMounted(() => {
    localTag.value = props.tag
})
</script>
<style scoped>
.tag {
    height: 24px;
    padding: 0 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: #D1D9E0 1px solid;
    font-size: 14px;
    line-height: 24px;
}

.cursor-pointer {
    cursor: pointer;
    transition: all 0.2s ease;
}

.cursor-pointer:hover {
    background-color: #f5f5f5;
}
</style>