<template>
  <transition name="iciba-main">
    <div
      class="iciba-main reset"
      :style="icibaMainStyle"
      v-show="visible">
      <div class="iciba-container" :style="icibaContainerStyle">
        <div class="input-container">
          <div class="input-box">
            <input
              class="search-input"
              type="text"
              @keypress.13="handleInputSearch"
              v-model="inputText" />
            <div class="setting-button"></div>
          </div>
          <div class="button-box">
            <div
              v-for="item in providers"
              :key="item.uniqName"
              @keydown.32.prevent
              class="button"
              @click="handleTranslateButtonClick(item)"
              :style="{ backgroundImage: `url('${item.icon}')` }">
            </div>
          </div>
        </div>
        <div class="content-box">
          <component
            class="provider-container"
            v-show="!loading && item.visible"
            v-for="item in providers"
            :ref="`provider-container-${item.uniqName}`"
            :is="item.containerComponentClass"
            :key="item.uniqName">
          </component>
          <div class="loading-tip content" v-show="loading">
            加载中{{ loadingDots }}
          </div>
          <div class="error-message content" v-show="!loading && errorMessage">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./IcibaMain.ts"></script>
<style lang="less" src="./IcibaMain.less" scoped></style>
