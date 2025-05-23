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
.btn *{
    color: white;
}
.btn{
    cursor: pointer;
    height: 32px;
    padding: 0 12px;
    border: #D1D9E0 1px solid;
    border-radius: 6px;
    display: flex;
    font-size: 14px;
    font-weight: 500;
    justify-content: center;
    align-items: center;
    background-color: #1F883D;
    user-select: none;
    margin-right: 8px;
}
.btn:hover{
    background-color: #1C8139;
}
</style>