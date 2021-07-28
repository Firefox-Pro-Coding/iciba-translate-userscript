<template>
  <div>
    <div
      class="iciba-size-helper fixed top-auto left-auto bottom-0 right-0 w-0 h-0 overflow-hidden"
      :ref="refs.sizeHelper"
    />
    <transition name="m">
      <div
        class="iciba-main-wrap absolute overflow-visible ease-in-out duration-150 transition-opacity"
        v-show="visible"
        :ref="refs.icibaMainWrap"
      >
        <div
          class="iciba-main absolute flex-col items-stretch h-auto text-14 ease-in-out duration-150 transition-transform"
          @mouseenter="state.stickBoxVisible = true"
          @mouseleave="state.stickBoxVisible = false"
          :style="mainStyle"
          :ref="refs.icibaMain"
        >
          <div class="input-box flex relative flex-none bg-white">
            <div
              class="iciba-input-box flex relative flex-auto border-b border-grey-350"
              :class="{
                'focused': state.inputFocused,
              }"
            >
              <input
                class="search-input flex-auto text-grey-900"
                :ref="refs.icibaSearchInput"
                size="1"
                type="text"
                v-model="state.inputText"
                @focus="state.inputFocused = true"
                @blur="state.inputFocused = false"
                @keydown.capture.stop
                @keypress.enter="m.handleInputEnter"
              >
              <div
                class="input-button flex flex-center cursor-pointer"
                v-if="store.core.history"
                @click="m.handleOpenHistory"
              >
                <i-icon :size="21" :svg="icon.historyIcon" color="#aaa" />
              </div>
              <div
                class="input-button flex flex-center cursor-pointer"
                @click="m.handleOpenSetting"
              >
                <i-icon :svg="icon.settingsIcon" />
              </div>
            </div>

            <div class="provider-box flex border-b border-grey-350">
              <template v-for="provider of showButtonProviders" :key="provider.id">
                <div class="split border-l border-grey-350" />
                <button
                  @keydown.enter="m.handleTranslateWithProvider(provider.id)"
                  @click="m.handleTranslateWithProvider(provider.id)"
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
              :is="activeProvider.translateView"
              :key="activeProvider.id"
            />
            <div
              class="loading-tip content-item text-grey-900"
              v-if="translateLoading"
            >
              <LoadingText />
            </div>
            <div
              class="provider-error-message content-item text-grey-900"
              v-if="!translateLoading && errorMessage"
            >
              {{ errorMessage }}
            </div>
            <div
              class="show-up-tip content-item text-grey-500"
              v-if="!activeProvider && !translateLoading && !errorMessage"
            >
              等待输入查词
            </div>
          </div>

          <transition name="s">
            <div
              class="stick-box absolute border-l border-grey-350"
              v-if="store.core.showPin"
              v-show="store.core.pinned || state.stickBoxVisible"
            >
              <div
                class="drag flex flex-center border-b border-grey-350"
                @mousedown="m.pinDrag.handlePinDragStart"
              >
                <i-icon :svg="icon.dragIcon" />
              </div>
              <div
                class="stick flex flex-center relative"
                :class="{
                  pinned: store.core.pinned,
                }"
                @click="m.pinDrag.handleTogglePinned"
              >
                <i-icon :svg="icon.pinIcon" />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" src="./IcibaMain.ts"></script>
<style lang="sass" src="./IcibaMain.sass" scoped></style>
