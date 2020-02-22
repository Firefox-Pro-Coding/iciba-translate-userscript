<template>
  <transition name="s">
    <div
      class="setting-modal flex flex-center fixed inset-0 ease-in-out duration-300"
      :class="{
        visible: state.visible,
      }"
      v-if="state.visible"
      :style="{ zIndex: state.zIndex }"
      @click.self="handleCloseSetting"
    >
      <div class="setting-window relative flex bg-white shadow-8 ease-in-out duration-300">
        <div class="bg-v-indigo flex-none items-center">
          <i-tabs
            v-model="state.tab"
            dark
            slider-color="rgba(255,255,255,0.8)"
          >
            <i-tab>设置</i-tab>
            <i-tab>core</i-tab>
            <i-tab>iciba</i-tab>
            <i-tab>google 字典</i-tab>
            <i-tab>google 翻译</i-tab>
            <i-tab>百度翻译</i-tab>
            <i-tab>搜狗翻译</i-tab>
            <i-tab>urban<br>dictionary</i-tab>
            <i-tab>bing 翻译</i-tab>
            <i-tab>Vocabulary</i-tab>
          </i-tabs>
        </div>

        <i-tabs-items
          class="tabs-box flex-auto"
          v-no-overscroll
          v-model="state.tab"
        >
          <i-tab-item class="p-3"><about /></i-tab-item>
          <i-tab-item class="p-3"><coreSetting /></i-tab-item>
          <i-tab-item class="p-3"><iciba /></i-tab-item>
          <i-tab-item class="p-3"><googleDict /></i-tab-item>
          <i-tab-item class="p-3"><googleTranslate /></i-tab-item>
          <i-tab-item class="p-3"><baiduTranslate /></i-tab-item>
          <i-tab-item class="p-3"><sougouTranslate /></i-tab-item>
          <i-tab-item class="p-3"><urbanDictionary /></i-tab-item>
          <i-tab-item class="p-3"><bingTranslate /></i-tab-item>
          <i-tab-item class="p-3"><vocabulary /></i-tab-item>
        </i-tabs-items>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./SettingPage.ts"></script>
<style lang="sass" src="./SettingPage.sass" scoped></style>
