<template>
  <div class="iciba-app-root-container" ref="rootElement">
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
