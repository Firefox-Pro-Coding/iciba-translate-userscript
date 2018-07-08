<template>
  <div class="iciba-app-root-container">
    <iciba-main ref="icibaMain"></iciba-main>
    <iciba-circle ref="icibaCircle"></iciba-circle>
    <size-helper ref="sizeHelper"></size-helper>
    <!-- don't render setting before open it for first time -->
    <setting-page v-if="settingPageVisible"></setting-page>
  </div>
</template>

<script lang="ts" src="./App.ts"></script>
