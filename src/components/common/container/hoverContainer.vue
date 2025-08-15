<!--
 * @Author: Dhx
 * @Date: 2025-05-14 20:41:13
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\common\container\hoverContainer.vue
-->
<template>
    <div tabindex="-1" @blur="display = false">
        <div class="item" @click="display = true">
            <slot name="item">

            </slot>
        </div>
        <div class="box" v-if="display" @click="display = false">
            <slot name="box">

            </slot>
        </div>
    </div>

</template>
<script setup lang="ts">
import { ref } from 'vue';
const display = ref(false)
</script>
<style scoped>
.item {
    position: relative;
    cursor: pointer;
}

/* .item:hover + .box {
    display: block;
} */
.box {
    position: absolute;
    /* display: none; */
    z-index: 100;
    background-color: white;
    transform: translate(-85%);
}
</style>