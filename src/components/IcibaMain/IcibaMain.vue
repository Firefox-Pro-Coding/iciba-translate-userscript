<template>
  <transition name="m">
    <div
      class="iciba-main-wrap absolute overflow-visible ease-in-out duration-150 transition-opacity"
      :class="{
        dragging: state.drag.dragging,
      }"
      :style="icibaMainWrapStyle"
      v-show="state.visible"
      ref="icibaMainWrap"
    >
      <div
        ref="computedIcibaMainStyle"
        class="iciba-main absolute flex-col items-stretch text-14 ease-in-out duration-150 transition-transform"
        @mouseenter="state.stickBoxVisible = true"
        @mouseleave="state.stickBoxVisible = false"
        :style="icibaMainStyle"
      >
        <div class="input-box flex relative flex-none bg-white">
          <div
            class="iciba-input-box flex relative flex-auto"
            :class="{
              'focused': state.inputFocused,
            }"
          >
            <input
              class="search-input flex-auto"
              ref="icibaSearchInput"
              size="1"
              type="text"
              v-model="state.inputText"
              @focus="state.inputFocused = true"
              @blur="state.inputFocused = false"
              @keypress.13="m.handleInputConfirm"
              @keydown.stop
            >
            <div
              class="setting-button flex flex-center absolute cursor-pointer"
              @click="m.handleOpenSetting"
            >
              <i-icon :svg="icon.settings_149837" />
            </div>
          </div>

          <div class="provider-box flex">
            <template v-for="provider of showButtonProviders">
              <div
                class="split"
                :key="`${provider.id}index`"
              />
              <button
                :key="provider.id"
                @keydown.13="m.translateWithProvider(provider)"
                @click="m.translateWithProvider(provider)"
                class="provider-button flex flex-center relative flex-none"
              >
                <i-icon :svg="m.getIcon(provider)" />
              </button>
            </template>
          </div>
        </div>

        <div class="content-box relative">
          <component
            class="provider-container"
            v-if="!translateLoading && !errorMessage && activeProvider"
            :is="activeProvider.view"
            :key="activeProvider.id"
          />
          <div class="loading-tip content-item" v-if="translateLoading">
            <LoadingText />
          </div>
          <div class="provider-error-message content-item" v-if="!translateLoading && errorMessage">
            {{ errorMessage }}
          </div>
        </div>

        <transition name="s">
          <div
            class="stick-box absolute"
            v-if="store.config.core.showPin"
            v-show="store.config.core.pinned || state.stickBoxVisible"
          >
            <div
              class="drag flex flex-center"
              @mousedown="m.pinDrag.handlePinDragStart"
            >
              <i-icon :svg="icon.drag_462998" />
            </div>
            <div
              class="stick flex flex-center relative"
              :class="{
                pinned: store.config.core.pinned,
              }"
              @click="m.pinDrag.handleTogglePinned"
            >
              <i-icon :svg="icon.pin_25474" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./IcibaMain.ts"></script>
<style lang="less" src="./IcibaMain.less" scoped></style>
