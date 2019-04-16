<template>
  <transition name="iciba-main">
    <div
      class="iciba-main"
      :class="{ dragging: drag.dragging }"
      ref="icibaMain"
      :style="computedIcibaMainStyle"
      v-show="visible">
      <div
        class="iciba-container q-flex-co align-stretch"
        @mouseenter="stickBoxVisible = true"
        @mouseleave="stickBoxVisible = false"
        :style="icibaContainerStyle">
        <transition name="stick-box">
          <div class="stick-box" v-if="config.core.showPin" v-show="config.core.pinned || stickBoxVisible">
            <div class="drag" @mousedown="handlePinDragStart"></div>
            <div class="stick" :class="{ pinned: config.core.pinned }" @click="togglePinned"></div>
          </div>
        </transition>
        <div class="iciba-input-container q-flex">
          <div class="iciba-input-box q-flex" :class="{ 'input-focused': inputFocused }">
            <input
              id="iciba-search-input"
              class="iciba-search-input"
              size="1"
              type="text"
              @focus="inputFocused = true"
              @blur="inputFocused = false"
              @keypress.13="handleInputSearch"
              v-model="inputText" />
            <div class="iciba-setting-button" @click="handleOpenSetting"></div>
          </div>
          <div class="provider-button-box q-flex">
            <template
              v-for="item in providers">
              <div
                class="split"
                :key="item.provider.uniqName + 'index'">
              </div>
              <button
                :key="item.provider.uniqName"
                v-if="isProviderVisible(item.provider.uniqName)"
                @keydown.13="handleTranslateButtonClick(item)"
                @click="handleTranslateButtonClick(item)"
                class="provider-button"
                :style="{ backgroundImage: `url('${item.provider.icon}')` }">
              </button>
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
