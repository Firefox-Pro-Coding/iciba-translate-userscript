<template>
  <transition name="iciba-setting-modal">
    <div
      class="iciba-setting-modal"
      :class="{ visible }"
      :style="{ zIndex: zIndex }"
      @click="handleCloseSetting"
      v-show="visible">
      <div class="iciba-setting-window">
        <div class="close-btn" @click="closeSetting"></div>
        <div class="tabs">
          <div
            class="tab"
            :class="{ active: currentTab === 'core' }"
            @click="switchTab('core')">
            core
          </div>
          <div
            class="tab"
            :class="{ active: currentTab === 'iciba' }"
            @click="switchTab('iciba')">
            iciba
          </div>
          <div
            class="tab"
            :class="{ active: currentTab === 'googleDict' }"
            @click="switchTab('googleDict')">
            google
          </div>
          <div
            class="tab"
            :class="{ active: currentTab === 'googleTranslate' }"
            @click="switchTab('googleTranslate')">
            google翻译
          </div>
          <div
            class="tab"
            :class="{ active: currentTab === 'baiduTranslate' }"
            @click="switchTab('baiduTranslate')">
            百度翻译
          </div>
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
