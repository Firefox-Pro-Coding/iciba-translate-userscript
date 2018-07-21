<template>
  <div class="iciba-app-root-container">
    <iciba-circle ref="icibaCircle"></iciba-circle>
    <size-helper ref="sizeHelper"></size-helper>
    <!-- lazy load components -->
    <iciba-main :size-helper="$refs.sizeHelper" ref="icibaMain" v-if="icibaMainFirstLoaded"></iciba-main>
    <setting-page v-if="settingPageFirstLoaded"></setting-page>

    <google-dict-modal v-if="googleDictModalFirstLoaded"></google-dict-modal>
  </div>
</template>

<script lang="ts" src="./App.ts"></script>
