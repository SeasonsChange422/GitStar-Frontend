<!--
 * @Author: Dhx
 * @Date: 2025-05-04 15:26:57
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\common\container\commonContainer.vue
-->
<template>
    <div class="container">
        <div class="container-header">
            <slot name="header"></slot>
        </div>
        <div class="container-body" :style="`max-height:${props.scroll?'80vh':'fit-content'};overflow-y:${props.scroll?'scroll':'auto'}`">
            <slot name="body"></slot>
        </div>
        <div class="container-footer" v-if="slots.footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useSlots } from 'vue'
const props = defineProps({
    scroll: {
        type:Boolean,
        default:true
    }
})
const slots = useSlots()
</script>
<style scoped>
.container{
    width: 100%;
    border: #D1D9E0 1px solid;
    border-radius: 6px;
    background-color: #FFFFFF;
    overflow: hidden;
}
.container-header{
    height: 52px;
    padding: 4px;
    background-color: #F6F8FA;
    border-bottom: #D1D9E0 1px solid;
    border-radius: 6px 6px 0 0;
}
.container-body{
    /* background-color: #FFFFFF; */
    max-height: 80vh;
    overflow-y:scroll;
    width: 100%;
}
.container-footer{
    height: 65px;
    border-top: #D1D9E0 1px solid;
}
</style>