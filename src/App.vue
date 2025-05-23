<!--
 * @Author: Dhx
 * @Date: 2025-01-08 16:01:27
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\App.vue
-->
<template>
  <v-app>
    <v-main>
      <Message></Message>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>

import Message from './components/message.vue';

  //
</script>
<style>
*{
  margin: 0;
  padding: 0;
  /* list-style: none; */
  color: #1F2328;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}
html{
  width: 100vw;
  height: 100vh;
}
body{
  width: 100vw;
  height: 100vh;
}
.label {
    height: 21px;
    margin: 0 0 8px;
    font-size: 14px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}

.input {
    width: 180px;
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

.input:focus {
    border: #0969DA 2px solid;
}
</style>
