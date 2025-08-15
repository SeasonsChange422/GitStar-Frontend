<!--
 * @Author: Dhx
 * @Date: 2025-05-16 00:33:49
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\historyComponent.vue
-->
<template>
    <div class="history-container">
        <div class="avatar">
            <img :src="user.avatar" width="40" height="40" >
        </div>
        <div class="content">
            <commonContainer :scroll="false">
                <template v-slot:header>
                    <div class="content-header">
                        <span class="username">
                            {{ user.nickname }}
                        </span>
                        <span class="time">
                            {{ getTimeAgo(localTask.createTime) }}
                        </span>
                    </div>
                </template>
                <template v-slot:body>
                    <div class="content-body">
                        {{ localTask.content }}
                    </div>
                </template>
            </commonContainer>
        </div>
    </div>
</template>
<script setup lang="ts">
import {getUserById} from '@/api/user/userApi'
import {User} from '@/api/user/userType'
import {ref,onMounted} from 'vue'
import {TaskHistory} from '@/api/history/historyType'
import {getTimeAgo} from '@/utils/time'
const props = defineProps({
    history: {} as TaskHistory  
})
const user = ref<User>({})
const localTask = ref<TaskHistory>({})
onMounted(()=>{
    localTask.value = props.history
    getUserByIdFunction()
})
const getUserByIdFunction = () => {
    getUserById(localTask.value.userId).then((res:any)=>{
        if(res.code == 200){
            user.value = res.data
        }
    })
}
</script>
<style scoped>
.history-container{
    display: flex;
    margin-bottom: 16px;
    gap: 16px;
}
.avatar{
    width: 40px;
}
.avatar img{
    width: 40px;
    height: 40px;
    border-radius: 20px;
}
.content{
    width: 854px;
}
.content-header{
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px;
}
.username{
    color: #1f2328;
    font-size: 14px;
    font-weight: 500;
}
.time{
    color: #59636e;
    font-size: 14px;
    margin-left: 8px;
}
.content-body{
    padding: 16px;
}
</style>