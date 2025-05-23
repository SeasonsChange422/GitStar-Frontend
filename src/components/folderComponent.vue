<template>
    <div class="container">
        <div class="container-name">
            <div class="icon">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="#54AEFF"
                        data-view-component="true" class="octicon octicon-table Underlineuser-nav-octicon">
                        <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z">
                        </path>
                </svg>
            </div>
            <div class="name" v-if="localFile&&localFile.path">
                {{ localFile.path.substring(localFile.path.indexOf('/')+1).replace(props.currentPath,'').replace('/','') }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {RepositoryFile} from '@/api/repository/repositoryType'
import { onMounted } from 'vue';
import { ref } from 'vue';
const props = defineProps({
    file: {} as RepositoryFile,
    currentPath: {
        type: String
    }
})
const localFile = ref<RepositoryFile>({})
onMounted(()=>{
    localFile.value = JSON.parse(JSON.stringify(props.file))
})
</script>
<style scoped>
.container{
    height: 41px;
    width: 100%;
    display: flex;
    cursor: pointer;
    transition: all 0.3s;
}
.container:hover{
    background-color: #D1D9E0;
}
.container-name{
    height: 41px;
    width: 357.59px;
    padding: 0 0 0 16px;
    display: flex;
    align-items: center;
}
.icon{

}
.name{
    margin-left: 10px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}
.name a{
    text-decoration: none;
}
.name a:hover{
    color: #0969DA;
    text-decoration: underline;
}
</style>