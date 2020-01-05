<template>
  <transition name="s">
    <div
      class="setting-modal flex flex-center"
      :class="{
        visible: state.visible,
      }"
      v-if="state.visible"
      :style="{ zIndex: state.zIndex }"
      @click.self="handleCloseSetting"
    >
      <div class="setting-window flex elevation-8">
        <div class="indigo flex-noresize align-center">
          <i-tabs
            v-model="state.tab"
            color="indigo"
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
          </i-tabs>
        </div>

        <i-tabs-items
          class="tabs-box fill-height flex-auto"
          v-no-overscroll
          v-model="state.tab"
        >
          <i-tab-item class="pa-3"><about /></i-tab-item>
          <i-tab-item class="pa-3"><coreSetting /></i-tab-item>
          <i-tab-item class="pa-3"><iciba /></i-tab-item>
          <i-tab-item class="pa-3"><googleDict /></i-tab-item>
          <i-tab-item class="pa-3"><googleTranslate /></i-tab-item>
          <i-tab-item class="pa-3"><baiduTranslate /></i-tab-item>
          <i-tab-item class="pa-3"><sougouTranslate /></i-tab-item>
          <i-tab-item class="pa-3"><urbanDictionary /></i-tab-item>
          <i-tab-item class="pa-3"><bingTranslate /></i-tab-item>
        </i-tabs-items>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./SettingPage.ts"></script>
<style lang="less" src="./SettingPage.less" scoped></style>
