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
    <div class="loginContainer">
        <div class="loginContainer-center">
            <h1 class="title">Sign in to GitHub</h1>
            <div class="login">
                <label class="label">
                    Username or email address
                </label>
                <br>
                <input class="input" v-model="loginForm.account">
                <br>
                <label class="label">
                    Password
                </label>
                <br>
                <input class="input" v-model="loginForm.password">
                <br>
                <button class="button" @click="loginFunction()">
                    Sign in
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { login, getUserInfo } from '@/api/user/userApi'
import { LoginForm } from '@/api/user/userType'
import { storage } from '@/utils/storage'
import router from '@/router'
const loginForm = ref<LoginForm>({
    account: '',
    password: ''
})
const loginFunction = () => {
    login(loginForm.value).then((res: any) => {
        if (res.code == 200) {
            storage.set('token', res.data)
            getUserInfo().then((res: any) => {
                if (res.code == 200) {
                    storage.set('user',res.data)
                    setTimeout(() => {
                        router.push('./')
                    }, 500)
                }
            })

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

.loginContainer {
    height: 368px;
    width: 100vw;
    display: flex;
    justify-content: center;
}

.loginContainer-center {
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
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.login {
    height: 220px;
    margin: 16px 0 0;
    padding: 16px;
    background-color: #F6F8FA;
    border: #DCE2E8 1px solid;
    border-radius: 6px;
}

.label {
    height: 21px;
    margin: 0 0 8px;
    font-size: 13px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    outline: none;
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
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #1F883D;

}

.button:hover {
    background-color: #1C8139;
}
</style>