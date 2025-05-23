<!--
 * @Author: Dhx
 * @Date: 2025-05-04 16:36:33
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\common\button\commonBtn.vue
-->
<template>
    <div class="btn" @click="onClick">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    confirm: {
        type:Boolean,
        default:false
    }
})
const emit = defineEmits(['click']);

const onClick = (event: MouseEvent) => {
    event.stopPropagation(); // 阻止事件冒泡
    if(!props.confirm){
        emit('click', event)
        return
    }
    const isConfirmed = confirm('确定执行操作吗？'); // 同步确认框
    if (isConfirmed) {
        emit('click', event)
        return
    }
};
</script>
<style scoped>
.btn{
    cursor: pointer;
    height: 32px;
    padding: 0 12px;
    border: #D1D9E0 1px solid;
    border-radius: 6px;
    background-color: #F6F8FA;
    display: flex;
    font-size: 14px;
    font-weight: 500;
    justify-content: center;
    align-items: center;
    user-select: none;
    margin-right: 8px;
}
.btn:hover{
    background-color: #EFF2F5;
}
</style>