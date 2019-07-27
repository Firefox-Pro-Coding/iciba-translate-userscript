<template>
  <transition name="iciba-setting-modal">
    <div
      class="iciba-setting-modal flex flex-center"
      :class="{ visible }"
      :style="{ zIndex: zIndex }"
      @click="handleCloseSetting"
      v-if="visible">
      <div class="iciba-setting-window flex elevation-8">
        <div class="indigo flex-noresize align-center">
          <i-tabs
            v-model="tab"
            color="indigo"
            dark
            slider-color="rgba(255,255,255,0.8)">
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
          v-no-overscroll
          class="fill-height flex-auto"
          style="overflow: auto;"
          v-model="tab">
          <i-tab-item class="pa-3"><about /></i-tab-item>
          <i-tab-item class="pa-3"><core-setting /></i-tab-item>
          <i-tab-item class="pa-3"><iciba /></i-tab-item>
          <i-tab-item class="pa-3"><google-dict /></i-tab-item>
          <i-tab-item class="pa-3"><google-translate /></i-tab-item>
          <i-tab-item class="pa-3"><baidu-translate /></i-tab-item>
          <i-tab-item class="pa-3"><sougou-translate /></i-tab-item>
          <i-tab-item class="pa-3"><urban-dictionary /></i-tab-item>
          <i-tab-item class="pa-3"><bing-translate /></i-tab-item>
        </i-tabs-items>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./SettingPage.ts"></script>
<style lang="less" src="./SettingPage.less" scoped></style>
