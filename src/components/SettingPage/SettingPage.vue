<template>
  <transition name="iciba-setting-modal">
    <div
      class="iciba-setting-modal"
      :class="{ visible }"
      @click="handleCloseSetting"
      v-show="visible">
      <div class="iciba-setting-window">
        <div class="close-btn" @click="closeSetting"></div>
        <div class="tabs">
          <div class="tab" @click="switchTab('core')">core</div>
          <div class="tab" @click="switchTab('iciba')">iciba</div>
          <div class="tab" @click="switchTab('googleDict')">google</div>
          <div class="tab" @click="switchTab('googleTranslate')">google翻译</div>
          <div class="tab" @click="switchTab('baiduTranslate')">百度翻译</div>
        </div>
        <div class="setting-container">
          <core-setting v-if="currentTab === 'core'"></core-setting>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./SettingPage.ts"></script>
<style lang="less" src="./SettingPage.less" scoped></style>
