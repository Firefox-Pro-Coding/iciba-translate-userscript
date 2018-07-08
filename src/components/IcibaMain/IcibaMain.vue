<template>
  <transition name="iciba-main">
    <div
      class="iciba-main reset iciba-main-the-long-class"
      :style="icibaMainStyle"
      v-show="visible">
      <div class="iciba-container flex-co flex-stretch" :style="icibaContainerStyle">
        <div class="iciba-input-container flex">
          <div class="iciba-input-box flex">
            <input
              class="iciba-search-input"
              size="1"
              type="text"
              @keypress.13="handleInputSearch"
              v-model="inputText" />
            <div class="iciba-setting-button" @click="handleOpenSetting"></div>
          </div>
          <div class="provider-button-box flex">
            <div
              v-for="item in providers"
              :key="item.uniqName"
              @keydown.32.prevent
              class="provider-button"
              @click="handleTranslateButtonClick(item)"
              :style="{ backgroundImage: `url('${item.icon}')` }">
            </div>
          </div>
        </div>
        <div class="iciba-content-container">
          <component
            class="provider-container"
            v-show="!loading && item.visible && !errorMessage"
            v-for="item in providers"
            :ref="`provider-container-${item.uniqName}`"
            :is="item.containerComponentClass"
            :key="item.uniqName">
          </component>
          <div class="loading-tip iciba-content" v-show="loading">
            加载中{{ loadingDots }}
          </div>
          <div class="error-message iciba-content" v-show="!loading && errorMessage">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./IcibaMain.ts"></script>
<style lang="less" src="./IcibaMain.less" scoped></style>
<style lang="less">
  @import '~assets/styles/global.less';
  @import '~assets/styles/hardreset.less';

  // to make sure no other site use this
  .iciba-main-the-long-class {
    .hard-reset();

    * {
      .hard-reset();
    }
  }
</style>
