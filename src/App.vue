<template>
  <div class="the-app">
    <iciba-circle ref="icibaCircle" />
    <iciba-main
      :get-iciba-circle="() => $refs.icibaCircle"
    />
    <setting-page />
    <google-dict-modal />
  </div>
</template>

<script lang="ts" src="./App.ts"></script>
<style src="./assets/styles/global.sass" lang="sass"></style>
<style scoped>
  .the-app {
    /* prevent style inheritance from page */
    /* https://greasyfork.org/zh-CN/forum/discussion/56072 */
    /* all: initial; */
    font-size: 16px;
    font-weight: normal;
    color: black;
    font-family: 'Roboto', 'Microsoft Yahei UI', 'Arial', sans-serif;
    line-height: 1.5;
  }
</style>
