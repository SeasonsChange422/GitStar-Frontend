<!--
 * @Author: Dhx
 * @Date: 2025-02-28 10:13:51
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\pages\admin.vue
-->

<template>
  <div style="
      z-index: 1000;
      background-color: white;
      min-height: 100vh;
      min-width: 100vw;
      position: relative;
    ">
    <v-app>
      <v-app-bar color="primary">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>Admin</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon style="margin-right: 20px">
          <RouterLink to="/home" style="text-decoration: none; color: white"><v-icon>mdi-home</v-icon></RouterLink>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" temporary>
        <v-list density="compact" nav>
          <v-list-item v-for="item in menuItems" :key="item.title" :prepend-icon="item.icon" :title="item.title"
            :value="item.value" :to="item.route"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <RouterView></RouterView>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script setup>
import router from "@/router";
import { onMounted } from "vue";
import { ref } from "vue";
onMounted(() => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.admin == false) router.push("/");
  // router.push('/admin/chart')
});
const drawer = ref(false);

const menuItems = [
  { title: "公告", icon: "mdi-bullhorn", route: "/admin/notice" },
  { title: "标签", icon: "mdi-tag-multiple", route: "/admin/tag" },
  { title: "反馈", icon: "mdi-message-alert", route: "/admin/feedback" },
  { title: "用户", icon: "mdi-account-group", route: "/admin/user" },
  { title: "帖子", icon: "mdi-post", route: "/admin/post" },
  { title: "项目", icon: "mdi-folder-multiple", route: "/admin/project" },
  { title: "仓库", icon: "mdi-source-repository", route: "/admin/repository" },
  { title: "发行版本", icon: "mdi-package-variant", route: "/admin/release" }
];
</script>
<style scoped></style>
