<!--
 * @Author: Dhx
 * @Date: 2025-05-07 15:49:37
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\common\container\dialogComponent.vue
-->
<template>
    <div v-if="props.modelValue">
        <div class="page" @click="$emit('update:modelValue', false)">
        </div>
        <div class="container">
            <slot></slot>
        </div>
    </div>

</template>
<script setup lang="ts">
import { ref,watch } from 'vue'
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    onChange: {
        type: Function,
        default: null
    }
})

defineEmits(['update:modelValue'])
watch(() => props.modelValue, (newVal) => {
    if (typeof props.onChange === 'function') {
        props.onChange(newVal)
    }
})
</script>
<style scoped>
.page {
    z-index: 100000;
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
}

.container {
    z-index: 100001;
    position: fixed;
    width: 640px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>