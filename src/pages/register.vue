<template>
    <div class="iconContainer">
        <div class="icon">
            <svg height="48" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="48" data-view-component="true"
                class="octicon octicon-mark-github">
                <path
                    d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z">
                </path>
            </svg>
        </div>
    </div>
    <div class="registerContainer">
        <div class="registerContainer-center">
            <h1 class="title">登录GitStar</h1>
            <div class="register">
                <label class="label">
                    邮箱
                </label>
                <br>
                <div class="code">
                    <input class="input" v-model="registerForm.email"><button class="button"
                        @click="sendCodeFunction()">
                        发送验证码
                    </button>
                </div>
                <label class="label">
                    验证码
                </label>
                <input class="input" v-model="registerForm.verifyCode">
                <br>
                <label class="label">
                    用户名
                </label>
                <input class="input" v-model="registerForm.username">
                <br>
                <label class="label">
                    密码
                </label>
                <br>
                <input class="input" v-model="registerForm.password">
                <br>
                <div class="link" @click="router.push('/login')">
                    已有帐号？去登录
                </div>
                <button class="button" @click="registerFunction()">
                    登录
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { register,sendCode } from '@/api/user/userApi'
import { RegisterForm } from '@/api/user/userType'
import {errorAlert,successAlert} from '@/utils/message'
import router from '@/router'
const registerForm = ref<RegisterForm>({
    username: '',
    password: '',
    email: '',
    verifyCode: '',
})

const registerFunction = () => {
    register(registerForm.value).then((res: any) => {
        if (res.code == 200) {
            successAlert("注册成功")
            setTimeout(()=>{
                router.push('/login')
            },2000)
        }
    })
}
const sendCodeFunction = () =>{
    if(registerForm.value.emial == ''){
        errorAlert('请输入邮箱')
    }
    sendCode(registerForm.value.email).then((res:any)=>{
        if(res.code == 200) {
            successAlert("发送成功")
        }
    })
}
</script>
<style scoped>
.iconContainer {
    height: 105px;
    padding: 32px 0 24px;
    display: flex;
    justify-content: center;
}

.icon {
    width: 48px;
    height: 48px;
}

.registerContainer {
    height: 368px;
    width: 100vw;
    display: flex;
    justify-content: center;
}

.registerContainer-center {
    width: 320px;
    margin: 0 796px;
    padding: 0 16px;
}

.title {
    height: 36px;
    font-size: 22px;
    text-align: center;
    line-height: 36px;
    font-weight: 300;
    letter-spacing: -0.5px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}

.register {
    min-height: 220px;
    margin: 16px 0 0;
    padding: 16px;
    background-color: #F6F8FA;
    border: #DCE2E8 1px solid;
    border-radius: 6px;
}
.code{
    display: flex;
    gap: 20px;
    justify-content: center;
}
.label {
    height: 21px;
    margin: 0 0 8px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}

.input {
    width: 100%;
    height: 32px;
    margin: 4px 0 16px;
    padding: 5px 12px;
    background-color: #FFFFFF;
    border: #D1D9E0 1px solid;
    border-radius: 6px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    outline: none;
}

.link {
    width: 100%;
    cursor: pointer;
    text-align: center;
    text-decoration: underline;
}

.input:focus {
    border: #0969DA 2px solid;
}

.button {
    height: 32px;
    width: 100%;
    margin: 0 0 0;
    padding: 5px 16px;
    font-size: 14px;
    font-weight: 700;
    border-radius: 6px;
    cursor: pointer;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    background-color: #1F883D;

}

.button:hover {
    background-color: #1C8139;
}
</style>