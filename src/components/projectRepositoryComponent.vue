<!--
 * @Author: Dhx
 * @Date: 2025-04-23 13:49:53
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\projectRepositoryComponent.vue
-->
<template>
    <div class="container">
        <div class="content">
            <div class="content-name">
                <router-link :to="`/repository?id=${localRepository.id}&tabs=overview`">{{ localRepository.name }}</router-link>
            </div>
            <div class="content-description">
                {{ localRepository.description }}
            </div>
            <div class="content-items">
                <SmallLabelComponent
                    :dArray="['M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z']"
                    :text="localRepository.view"
                 ></SmallLabelComponent>
                 <SmallLabelComponent
                    :dArray="[
                        'M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z',
                        'M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z'
                    ]"
                    :text="localRepository.download"
                 ></SmallLabelComponent>
                 <SmallLabelComponent
                    :dArray="[
                        'M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z'
                    ]"
                    :text="localRepository.star"
                 ></SmallLabelComponent>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {Repository} from '@/api/repository/repositoryType'
import { onMounted, ref } from 'vue';
import LabelComponent from './common/label/labelComponent.vue';
import SmallLabelComponent from './common/label/smallLabelComponent.vue';
const props = defineProps({
    repository: {} as Repository
})
const localRepository = ref<Repository>({})
onMounted(()=>{
    localRepository.value = props.repository
})
</script>
<style scoped>
.container{
    height: 152.5px;
    width: 440px;
    padding: 16px;
    border: #D1D9E0 1px solid;
    border-radius: 6px;
    margin-bottom: 16px;
}
.content{
    height: 118.5px;
    width: 406px;
}
.content-name *{
    height: 22.5px;
    width: 398px;
    color: #0969da;
    font-size: 14px;
    text-decoration: none;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}
.content-name a:hover{
    text-decoration: underline;
}
.content-description{
    width: 406px;
    height: 54px;
    margin: 8px 0 16px;
    color: #59636e;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}
.content-items{
    display: flex;
}
</style>