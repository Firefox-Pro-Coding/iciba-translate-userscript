<template>
  <transition name="iciba-main">
    <div
      class="iciba-main"
      :class="{ dragging: drag.dragging }"
      ref="icibaMain"
      :style="icibaMainStyle"
      v-show="visible">
      <div class="iciba-container q-flex-co align-stretch elevation-4" :style="icibaContainerStyle">
        <div class="iciba-input-container q-flex">
          <div class="iciba-input-box q-flex">
            <input
              id="iciba-search-input"
              class="iciba-search-input"
              size="1"
              type="text"
              @keypress.13="handleInputSearch"
              v-model="inputText" />
            <div class="iciba-setting-button" @click="handleOpenSetting"></div>
          </div>
          <div class="provider-button-box q-flex">
            <template
              v-for="item in providers">
              <div
                :key="item.provider.uniqName"
                v-if="isProviderVisible(item.provider.uniqName)"
                @keydown.32.prevent
                @click="handleTranslateButtonClick(item)"
                class="provider-button"
                :style="{ backgroundImage: `url('${item.provider.icon}')` }">
              </div>
            </template>
          </div>
        </div>
        <div class="iciba-content-container q-flec-co">
          <template v-for="item in providers">
            <component
              :key="item.provider.uniqName"
              class="provider-container"
              v-if="!loading && item.visible && !errorMessage"
              :is="item.provider.containerComponentClass">
            </component>
          </template>
          <div class="loading-tip iciba-content" v-if="loading">
            <loadind-text />
          </div>
          <div class="provider-error-message iciba-content" v-if="!loading && errorMessage">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./IcibaMain.ts"></script>
<style lang="less" src="./IcibaMain.less" scoped></style>
