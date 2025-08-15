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
    color: black;
}
.btn{
    cursor: pointer;
    height: 32px;
    padding: 0 12px;
    /* border: #D1D9E0 1px solid; */
    border-radius: 6px;
    display: flex;
    font-size: 14px;
    font-weight: 500;
    justify-content: center;
    align-items: center;
    user-select: none;
}
.btn:hover{
    background-color: #F2F3F4;
}
</style>