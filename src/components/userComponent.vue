<template>
    <div class="container">
        <routerLink :to="`user?id=${props.user.id}`">
            <img :src="props.user.avatar">
        </routerLink>
    </div>
    <div class="details">
        <div class="top">
            <img :src="props.user.avatar">
            <commonBtn>关注</commonBtn>
        </div>
        <div class="bottom">
            <span>{{ props.user.nickname }}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Developer } from '@/api/project/projectType'
const props = defineProps({
    user: {} as Developer
})
</script>
<style scoped>
.container{
    position: relative;
    height: 32px;
    width: 32px;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
}
.container img{
    height: 32px;
    width: 32px;
}
.container:hover + .details {
    visibility: visible;
}
.details:hover{
    visibility: visible;
}
.details{
    position: absolute;
    transform: translate(0,-105px);
    width: 240px;
    height: 100px;
    border-radius: 8px;
    border: #D1D9E0 1px solid;
    visibility: hidden;
    background-color: white;
    transition: all 0.1s;
    padding: 16px;
    box-shadow: #D1D9E0 0 0 5px 1px;
}
.top{
    height: 50px;
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
}
.top img{
    height: 48px;
    width: 48px;
    border-radius: 24px;
}
.bottom{
    height: 28px;
}
.bottom span{
    font-weight: 500;
    font-size: 14px;
}
</style>