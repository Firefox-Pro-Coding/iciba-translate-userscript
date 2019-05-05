<template>
  <div class="the-app">
    <iciba-circle ref="icibaCircle"></iciba-circle>
    <size-helper ref="sizeHelper"></size-helper>

    <!-- lazy load components -->
    <iciba-main
      :size-helper="$refs.sizeHelper"
      :iciba-circle="$refs.icibaCircle"
      :get-google-dict-modal="() => getGoogleDictModal()"
      v-if="icibaMainFirstLoaded">
    </iciba-main>

    <setting-page v-if="settingPageFirstLoaded"></setting-page>
    <google-dict-modal
      ref="googleDictModal"
      v-if="googleDictModalFirstLoaded">
    </google-dict-modal>
  </div>
</template>

<script lang="ts" src="./App.ts"></script>

<style lang="less">
  @import '~assets/styles/global.less';
</style>

<style lang="less" scoped>
  .the-app {
    // prevent style inheritance from page
    // https://greasyfork.org/zh-CN/forum/discussion/56072
    all: initial;
    font-family: 'Roboto', 'Microsoft Yahei', 'Microsoft Yahei UI', sans-serif;
    line-height: 1.5;
  }
</style>
