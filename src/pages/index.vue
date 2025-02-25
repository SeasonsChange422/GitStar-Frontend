<template>
  <div class="nav">
    <div class="menu-btn" @click="drawer = true">
      <v-icon icon="mdi-menu" color="#59636E" size="small"></v-icon>
    </div>
    <div class="icon">
      <svg height="32" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="32" data-view-component="true"
        class="octicon octicon-mark-github v-align-middle">
        <path
          d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z">
        </path>
      </svg>
    </div>
    <div class="user" v-if="user!=null&&user.id!=null">
      <img :src="user.avatar" @click="right_drawer = true">
    </div>
    <div class="login-btn" v-else @click="router.push('/login')">
        Sign in
      </div>
  </div>
  <div class="page">
    <div class="page-left">

    </div>
    <div class="page-right">

    </div>
  </div>
  <v-navigation-drawer v-model="left_drawer" :location="'left'" temporary width="320" style="">
    <div class="drawer-header">
      <div class="drawer-header-left">
        <svg height="32" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="32" data-view-component="true"
          class="octicon octicon-mark-github v-align-middle">
          <path
            d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z">
          </path>
        </svg>
      </div>
      <div class="drawer-header-right">
        <div class="drawer-header-right-btn">
          <v-icon icon="mdi-close" color="#59636E" size="x-small" @click="left_drawer = false"></v-icon>
        </div>
      </div>
    </div>
    <div class="drawer-body">
      <div class="drawer-body-list">
        <div class="drawer-body-list-item" v-for="item in leftDrawerItems" :key="item.id">
          <div v-if="item.isLine">
            <v-divider></v-divider>
          </div>
          <div v-else class="drawer-body-list-item__display">
            <div class="drawer-body-list-item-icon">
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                data-view-component="true" class="octicon octicon-home" style="fill: #59636E;">
                <path :d="item.svg"></path>
              </svg>
            </div>
            <div class="drawer-body-list-item-text">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
  <v-navigation-drawer v-model="right_drawer" :location="'right'" temporary width="320" style="">
    <div class="drawer-header">
      <div class="drawer-header-left">
        <svg height="32" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="32" data-view-component="true"
          class="octicon octicon-mark-github v-align-middle">
          <path
            d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z">
          </path>
        </svg>
      </div>
      <div class="drawer-header-right">
        <div class="drawer-header-right-btn">
          <v-icon icon="mdi-close" color="#59636E" size="x-small" @click="right_drawer = false"></v-icon>
        </div>
      </div>
    </div>
    <div class="drawer-body">
      <div class="drawer-body-list">
        <div class="drawer-body-list-item" v-for="item in rightDrawerItems" @click="item.function" :key="item.text">
          <div v-if="item.isLine" style="height: 20px;">
            <v-divider class="my-4" color="black" thickness="1" style="width: 270px;"></v-divider>
          </div>
          <div v-else class="drawer-body-list-item__display">
            <div class="drawer-body-list-item-icon">
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                data-view-component="true" class="octicon octicon-home" style="fill: #59636E;">
                <path :d="item.svg"></path>
              </svg>
            </div>
            <div class="drawer-body-list-item-text">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { User } from '@/api/user/userType'
import router from '@/router'
import { storage } from '@/utils/storage'
const left_drawer = ref<boolean>(false)
const right_drawer = ref<boolean>(false)
const leftDrawerItems = ref<{ svg: String, text: String }[]>([
  {
    id: '0',
    isLine: false,
    svg: "M6.906.664a1.749 1.749 0 0 1 2.187 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0 1 13.25 15h-3.5a.75.75 0 0 1-.75-.75V9H7v5.25a.75.75 0 0 1-.75.75h-3.5A1.75 1.75 0 0 1 1 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2Zm1.25 1.171a.25.25 0 0 0-.312 0l-5.25 4.2a.25.25 0 0 0-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v5.25h2.75a.25.25 0 0 0 .25-.25V6.23a.25.25 0 0 0-.094-.195Z",
    text: "Home",
    function: () => { }
  }
])
const rightDrawerItems = ref<{ svg: String, text: String }[]>([
  {
    id: '0',
    isLine: false,
    svg: "M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z",
    text: "Your Profile",
    function: () => { }
  },
  {
    id: '1',
    isLine: false,
    svg: "M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0ZM1.5 1.75v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25ZM11.75 3a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75Zm-8.25.75a.75.75 0 0 1 1.5 0v5.5a.75.75 0 0 1-1.5 0ZM8 3a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 3Z",
    text: "Your Project",
    function: () => { }
  },
  {
    id: '2',
    isLine: true
  },
  {
    id: '3',
    isLine: false,
    svg: "M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 2 13.25Zm10.44 4.5-1.97-1.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.97-1.97H6.75a.75.75 0 0 1 0-1.5Z",
    text: "Sign out",
    function: () => { logoutFunction() }
  }
])
const user = ref<User>({

})
onMounted(() => {
  user.value = storage.get('user')
})
const logoutFunction = () => {
  storage.remove('token')
  storage.remove('user')
  setTimeout(() => {
    router.go(0)
  }, 500)
}
</script>
<style scoped>
.nav {
  position: relative;
  height: 64px;
  padding: 16px;
  background-color: #F6F8FA;
  border-bottom: #D1D9E0 1px solid;
  display: flex;
}

.user {
  position: absolute;
  height: 32px;
  width: 32px;
  right: 32px;
  border-radius: 16px;
  cursor: pointer;
  overflow: hidden;
}
.login-btn{
  position: absolute;
  right: 32px;
  height: 32px;
  width: 65px;
  margin: 0 0 0 12px;
  padding: 4px 12px;
  color: #000;
  letter-spacing: -0.5px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 13px;
  cursor: pointer;
}
.login-btn:hover{
  color: #1F2328;
}

.user img {
  width: 32px;
  height: 32px;
}

.page {
  min-height: 100vh;
  width: 100vw;
  display: flex;
}

.drawer-header {
  height: 56px;
  width: 100%;
  padding: 8px 8px 0;
  display: flex;
}

.drawer-header-left {
  width: 248px;
  height: 46px;
  padding: 8px 0 6px 8px;
}

.drawer-header-right {
  width: 48px;
  height: 48px;
  padding: 8px;
}

.drawer-header-right-btn {
  height: 32px;
  width: 32px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.drawer-header-right-btn:hover {
  background-color: #EFF2F5;
  color: #1F2328;
}

.drawer-body {
  height: auto;
  width: 100%;
  padding: 16px 8px;
}

.drawer-body-list {
  height: 100%;
  width: 100%;
  padding: 8px;
}

.drawer-body-list-item {
  height: 32px;
  width: 100%;
  line-height: 20px;
  padding: 6px 8px;
  font-size: 12px;
  border-radius: 8px;
  display: flex;
}

.drawer-body-list-item__display {
  height: 32px;
  width: 100%;
  line-height: 20px;
  padding: 6px 8px;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
}

.drawer-body-list-item__display:hover {
  background-color: #F2F3F4;
}

.drawer-body-list-item-icon {
  display: flex;
  align-items: center;
}

.drawer-body-list-item-text {
  margin-left: 8px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 13px;
}

.menu-btn {
  height: 32px;
  width: 32px;
  border-radius: 4px;
  border: #D1D9E0 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.menu-btn:hover {
  background-color: #EAEDF0;
}

.icon {
  height: 32px;
  width: 32px;
  margin-left: 12px;
}

.page-left {
  width: 336px;
  height: 100vh;
  border-right: #D1D9E0 1px solid;
}

.page-right {
  width: calc(100vw - 336px);
  height: 100vh;
}
</style>