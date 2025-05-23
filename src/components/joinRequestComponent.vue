<template>
    <div class="container">
        <userComponent v-if="user&&user.id" :user="user"></userComponent>
        <span>申请加入项目</span>
        <div class="operation">
            <commonBtn @click="refuseJoinRequestFunction"><span>拒绝</span></commonBtn>
            <greenBtn @click="acceptJoinRequestFunction"><span>同意</span></greenBtn>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { User } from '@/api/user/userType'
import {getUserById} from '@/api/user/userApi'
import {JoinRequest,AcceptJoinRequestForm,RefuseJoinRequestForm} from '@/api/joinRequest/joinRequestType'
import {acceptJoinRequest,refuseJoinRequest} from "@/api/joinRequest/joinRequestApi"
import router from '@/router'
const props = defineProps({
    joinRequest: {} as JoinRequest
})
const localJoinRequest = ref<JoinRequest>({})
const user = ref<User>()
const acceptJoinRequestForm = ref<AcceptJoinRequestForm>({})
const refuseJoinRequestForm = ref<RefuseJoinRequestForm>({})
onMounted(()=>{
    localJoinRequest.value = props.joinRequest
    acceptJoinRequestForm.value.projectId = localJoinRequest.value.projectId
    refuseJoinRequestForm.value.projectId = localJoinRequest.value.projectId
    getUserByIdFunction()
})
const getUserByIdFunction = () =>{
    getUserById(localJoinRequest.value.userId).then((res:any)=>{
        if(res.code == 200){
            user.value = res.data
        }
    })
}
const acceptJoinRequestFunction = () =>{
    acceptJoinRequestForm.value.id = localJoinRequest.value.id
    acceptJoinRequest(acceptJoinRequestForm.value).then((res:any)=>{
        if(res.code == 200) {
            router.go(0)
        }
    })
}
const refuseJoinRequestFunction = () =>{
    refuseJoinRequestForm.value.id = localJoinRequest.value.id
    refuseJoinRequest(refuseJoinRequestForm.value).then((res:any)=>{
        if(res.code == 200) {
            router.go(0)
        }
    })
}
</script>
<style scoped>
.container{
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
}
.operation{
    display: flex;
    height: 40px;
    align-items: center;
}
</style>