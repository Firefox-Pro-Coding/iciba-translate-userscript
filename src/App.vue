<template>
  <div class="the-app">
    <iciba-circle :ref="refs.icibaCircle" />
    <iciba-main
      :get-iciba-circle="() => refs.icibaCircle.value"
    />
    <setting-page />
    <google-dict-modal />
    <history-modal />
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
    font-family: 'Source Han Sans SC', 'Microsoft Yahei UI', 'Microsoft Yahei', 'Arial', sans-serif;
    line-height: 1.5;
  }
</style>
