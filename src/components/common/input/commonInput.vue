<template>
    <div>
        <input class="input" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
    </div>
</template>

<script setup lang="ts">
defineProps({
    modelValue: {
        type: String,
        required: true
    }
})


defineEmits(['update:modelValue'])
</script>
<style scoped>
.input {
    width: 100%;
    height: 32px;
    margin: 4px 0;
    padding: 5px 12px;
    background-color: #FFFFFF;
    border: #D1D9E0 1px solid;
    border-radius: 6px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    outline: none;
}
</style>