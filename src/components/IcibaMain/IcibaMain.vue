<template>
  <transition name="m">
    <div
      class="iciba-main-wrap"
      :class="{
        dragging: state.drag.dragging,
      }"
      :style="icibaMainWrapStyle"
      v-show="state.visible"
      ref="icibaMainWrap"
    >
      <div
        ref="computedIcibaMainStyle"
        class="iciba-main flex-co align-stretch"
        @mouseenter="state.stickBoxVisible = true"
        @mouseleave="state.stickBoxVisible = false"
        :style="icibaMainStyle"
      >
        <div class="input-box flex">
          <div
            class="iciba-input-box flex"
            :class="{
              'focused': state.inputFocused,
            }"
          >
            <input
              class="search-input"
              ref="icibaSearchInput"
              size="1"
              type="text"
              v-model="state.inputText"
              @focus="state.inputFocused = true"
              @blur="state.inputFocused = false"
              @keypress.13="m.handleInputConfirm"
            >
            <div
              class="setting-button flex flex-center"
              @click="m.handleOpenSetting"
            >
              <i-icon :svg="icon.settings_149837" />
            </div>
          </div>

          <div class="provider-box flex">
            <template v-for="provider of showButtonProviders">
              <div
                class="split"
                :key="`${provider.uniqName}index`"
              />
              <button
                :key="provider.uniqName"
                @keydown.13="m.translateWithProvider(provider)"
                @click="m.translateWithProvider(provider)"
                class="provider-button flex flex-center"
              >
                <i-icon :svg="provider.icon" />
              </button>
            </template>
          </div>
        </div>

        <div class="content-box q-flec-co">
          <component
            v-if="!translateLoading && !errorMessage && activeProvider"
            class="provider-container"
            :is="activeProvider.containerComponentClass"
            :key="activeProvider.uniqName"
          />
          <div class="loading-tip content-box" v-if="translateLoading">
            <LoadingText />
          </div>
          <div class="provider-error-message content-box" v-if="!translateLoading && errorMessage">
            {{ errorMessage }}
          </div>
        </div>

        <transition name="s">
          <div
            class="stick-box"
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
              class="{
                'stick flex flex-center': true,
                pinned: store.config.core.pinned,
              }"
              @click="m.pinDrag.handleTogglePinned"
            >
              <i-icon svg="icon.pin_25474" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./IcibaMain.ts"></script>
<style lang="less" src="./IcibaMain.less" scoped></style>
