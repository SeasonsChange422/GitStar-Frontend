<!--
 * @Author: Dhx
 * @Date: 2025-05-01 23:42:20
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\common\label\smallLabelComponent.vue
-->
<template>
    <div class="g-label">
        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" :fill="props.fill" data-view-component="true"
            class="octicon octicon-table Underlineuser-nav-octicon" v-if="props.dArray&&props.dArray.length!=0">
            <path v-for="(d,index) in props.dArray" :key="index"
                :d="(d as string)">
            </path>
        </svg>
        <span>{{ props.text }}</span>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    dArray: {
        type:Array
    },
    text: {
        type:String
    },
    fill: {
        type:String,
        default:'#59636E'
    }
})
</script>
<style scoped>
.g-label {
    height: 16px;
    width: auto;
    border-radius: 6px;
    cursor: pointer;
    align-items: center;
    display: flex;
    margin-right: 8px;
}


.g-label svg {
    margin-right: 6px;
}

.g-label span {
    height: 24px;
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 1px;
    line-height: 22px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}
</style>