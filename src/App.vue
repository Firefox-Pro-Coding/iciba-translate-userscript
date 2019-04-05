<template>
  <v-app class="the-app" ref="VApp">
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
  </v-app>
</template>

<script lang="ts" src="./App.ts"></script>

<style lang="less">
  @import '~assets/styles/global.less';
</style>

<style lang="less" scoped>
  .the-app /deep/ .application--wrap {
    position: static;
  }
</style>

<style lang="stylus">
  @import '~../node_modules/vuetify/src/stylus/app.styl'
</style>
