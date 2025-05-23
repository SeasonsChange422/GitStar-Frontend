<!--
 * @Author: Dhx
 * @Date: 2025-05-16 13:31:58
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\admin\adminUserComponent.vue
-->
<template>
    <dialogComponent v-model="computedValue">
        <commonContainer :scroll="false">
            <template v-slot:header>
                <div class="header">
                    用户 {{user.id}}
                </div>
            </template>
            <template v-slot:body>
                <div class="body">
                    <labelComponent :text="'头像'"></labelComponent>
                    <img :src="user.avatar" class="avatar">
                    <labelComponent :text="'用户ID'"></labelComponent>
                    <div class="info">
                        {{ user.id }}
                    </div>
                    <labelComponent :text="'用户名'"></labelComponent>
                    <div class="info">
                        {{ user.username }}
                    </div>
                    <labelComponent :text="'邮箱'"></labelComponent>
                    <div class="info">
                        {{ user.email }}
                    </div>
                    <labelComponent :text="'昵称'"></labelComponent>
                    <div class="info">
                        {{ user.nickname }}
                    </div>
                    <labelComponent :text="'简介'"></labelComponent>
                    <div class="info">
                        {{ user.description }}
                    </div>
                    <labelComponent :text="'是否为管理员'"></labelComponent>
                    <div class="info">
                        {{ user.isAdmin?'是':'否' }}
                    </div>

                </div>
            </template>
            <template v-slot:footer>
                <div class="footer">
                    <commonBtn :confirm="true" v-if="!user.isAdmin" @click="setAdminFunction()">
                        <span>
                            设为管理员
                        </span>
                    </commonBtn>
                    <commonBtn :confirm="true" @click="banUserFunction()">
                        <span>
                            {{ user.isBan?'解除封禁':'封禁' }}
                        </span>
                    </commonBtn>
                </div>
            </template>
        </commonContainer>
    </dialogComponent>
</template>
<script setup lang="ts">
import { ref, computed,onMounted } from 'vue'
import {User} from '@/api/user/userType'
import {getUserById} from '@/api/user/userApi'
import {setAdmin,banUser} from '@/api/admin/adminApi'
import router from '@/router'
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    userId:{
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:modelValue'])
const localUserId = ref('')
const user = ref<User>({})
const computedValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
const getUserByIdFunction = () => {
    getUserById(localUserId.value).then((res:any)=>{
        if(res.code == 200){ 
            user.value = res.data
        }
    })
}
onMounted(()=>{
    localUserId.value = props.userId
    getUserByIdFunction()
})
const setAdminFunction = () => {
    setAdmin(user.value.id).then((res:any)=>{
        if(res.code== 200) {
            router.go(0)
        }
    })
}
const banUserFunction = () => {
    banUser(user.value.id).then((res:any)=>{
        if(res.code == 200){
            router.go(0)
        }
    })
}
</script>
<style scoped>
.header{
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
}
.body{
    padding: 16px;
}
.avatar{
    height: 96px;
    width: 96px;
    border-radius: 48px;
}
.info{
    padding: 16px;
}
.footer{
    height: 100%;
    display: flex;
    align-items: center;
    padding: 8px 0;
    justify-content: end;
    gap: 8px;
}
</style>