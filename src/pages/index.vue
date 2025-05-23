<template>
  <div class="nav">
    <div class="menu-btn" @click="left_drawer = true">
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
    <div class="path">
      <v-breadcrumbs :items="path"></v-breadcrumbs>
    </div>
    <div class="new">
      <v-select :items="newItems" v-model="newV" @update:modelValue="updateFunction()" item-title="label"
        item-value="value" variant="outlined" density="compact">
        <template v-slot:selection="{ item, index }">
          +
        </template>
      </v-select>
    </div>
    <div class="user" v-if="user != null && user.id != null">
      <img :src="user.avatar" @click="right_drawer = true">
    </div>
    <div class="login-btn" v-else @click="router.push('/login')">
      登录
    </div>
  </div>
  <div class="routerView">
    <router-view />
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
        <div class="drawer-body-list-item" v-for="item in leftDrawerItems" @click="item.function" :key="item.id">
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
  <feedbackComponent v-model="feedbackDisabled"></feedbackComponent>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { User } from '@/api/user/userType'
import { getProjectByToken } from '@/api/project/projectApi'
import router from '@/router'
import { storage } from '@/utils/storage'
import { onBeforeRouteUpdate } from 'vue-router';
const left_drawer = ref<boolean>(false)
const right_drawer = ref<boolean>(false)
const path = ref<{ title: String, href: String, disabled: boolean }[]>([

])
const feedbackDisabled = ref(false)
const newItems = ref<{
  label: String;
  value: Number;
  href:String;
}[]>([
  {
    label: '新建项目',
    value: 0,
    href: '/newProject'
  },
  // {
  //   label: 'New repository',
  //   value: 1,
  //   href: '/newRepository'
  // },
  {
    label: '新建帖子',
    value: 1,
    href: '/newPost'
  }
])
const newV = ref(-1)
const updateFunction = () => {
  router.push(newItems.value[newV.value].href)
}
const leftDrawerItems = ref<{ id: String, isLine: boolean, svg: String, text: String, function: Function }[]>([
  {
    id: '0',
    isLine: false,
    svg: "M6.906.664a1.749 1.749 0 0 1 2.187 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0 1 13.25 15h-3.5a.75.75 0 0 1-.75-.75V9H7v5.25a.75.75 0 0 1-.75.75h-3.5A1.75 1.75 0 0 1 1 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2Zm1.25 1.171a.25.25 0 0 0-.312 0l-5.25 4.2a.25.25 0 0 0-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v5.25h2.75a.25.25 0 0 0 .25-.25V6.23a.25.25 0 0 0-.094-.195Z",
    text: "首页",
    function: () => { router.push('/home') }
  },
  {
    id: '1',
    isLine: false,
    svg: 'M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0ZM1.5 1.75v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25ZM11.75 3a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75Zm-8.25.75a.75.75 0 0 1 1.5 0v5.5a.75.75 0 0 1-1.5 0ZM8 3a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 3Z',
    text: '反馈',
    function: ()=> { feedbackDisabled.value = true}
  }
])
const rightDrawerItems = ref<{ id: String, isLine: boolean, svg: String, text: String, function: Function }[]>([
  {
    id: '0',
    isLine: false,
    svg: "M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z",
    text: "个人主页",
    function: () => { router.push('/user') }
  },
  {
    id: '1',
    isLine: false,
    svg: "M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0ZM1.5 1.75v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25ZM11.75 3a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75Zm-8.25.75a.75.75 0 0 1 1.5 0v5.5a.75.75 0 0 1-1.5 0ZM8 3a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 3Z",
    text: "我的项目",
    function: () => { router.push('/user?tabs=project') }
  },
  {
    id: '2',
    isLine: false,
    svg: "M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z",
    text:"我的帖子",
    function: () =>{router.push('/user?tabs=post')}
  },
  {
    id: '3',
    isLine: true,
    svg: '',
    text: '',
    function: () => { }
  },
  {
    id: '4',
    isLine: false,
    svg: "M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0Zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 0 0 0 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 0 0 1.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 0 0 0-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 0 0-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 0 0-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 0 0-1.142 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9.5 8a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 8Z",
    text: '管理员端',
    function: ()=>{router.push('/admin')}
  },
  {
    id: '5',
    isLine: false,
    svg: "M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 2 13.25Zm10.44 4.5-1.97-1.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.97-1.97H6.75a.75.75 0 0 1 0-1.5Z",
    text: "登出",
    function: () => { logoutFunction() }
  }
])
const user = ref<User>({

})
onMounted(() => {
  user.value = storage.get('user')
  initPath()
})
onBeforeRouteUpdate((to, from) => {
  initPath()
})
const initPath = () => {
  path.value = []
  const route = router.currentRoute.value
  if (route.path == '/home') {
    path.value.push({
      title: '主页',
      href: '/home',
      disabled: false
    })
  }
  if (route.path == '/user') {
    path.value.push({
      title: user.value.nickname,
      href: '/user',
      disabled: false
    })
  }
  if (route.query.tabs == 'project' && route.query.projectId != null) {
    path.value.push({
      title: '项目',
      href: '/user',
      disabled: false
    })
    path.value.push({
      title: '项目',
      href: '/user',
      disabled: false
    })
  }
}
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

.login-btn {
  position: absolute;
  right: 32px;
  height: 32px;
  width: 65px;
  margin: 0 0 0 12px;
  padding: 4px 12px;
  color: #000;
  letter-spacing: -0.5px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  cursor: pointer;
}

.login-btn:hover {
  color: #1F2328;
}

.user img {
  width: 32px;
  height: 32px;
}

.routerView {
  min-height: calc(100vh - 64px);
  width: 100vw;
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
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

.path {
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 14px;
  color: black;
}

.new {
  position: absolute;
  right: 100px;
  height: 32px;
  width: 80px;
}
</style>