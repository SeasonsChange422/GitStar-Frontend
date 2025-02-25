<!--
 * @Author: Dhx
 * @Date: 2025-01-08 16:01:27
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\App.vue
-->
<template>
  <v-app>
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
html{
  width: 100vw;
  height: 100vh;
}
body{
  width: 100vw;
  height: 100vh;
}
</style>
