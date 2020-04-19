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
        <div class="bg-indigo-500 flex-none items-center">
          <i-tabs
            v-model="state.tab"
            dark
            slider-color="rgba(255,255,255,0.8)"
          >
            <i-tab>设置</i-tab>
            <i-tab>core</i-tab>
            <i-tab>热键</i-tab>
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
          class="tabs-box flex-auto overflow-auto"
          v-no-overscroll
          v-model="state.tab"
        >
          <i-tab-item class="p-4"><about /></i-tab-item>
          <i-tab-item class="p-4"><core-setting /></i-tab-item>
          <i-tab-item class="p-4"><hot-key /></i-tab-item>
          <i-tab-item class="p-4"><iciba /></i-tab-item>
          <i-tab-item class="p-4"><google-dict /></i-tab-item>
          <i-tab-item class="p-4"><google-translate /></i-tab-item>
          <i-tab-item class="p-4"><baidu-translate /></i-tab-item>
          <i-tab-item class="p-4"><sougou-translate /></i-tab-item>
          <i-tab-item class="p-4"><urban-dictionary /></i-tab-item>
          <i-tab-item class="p-4"><bing-translate /></i-tab-item>
          <i-tab-item class="p-4"><vocabulary /></i-tab-item>
        </i-tabs-items>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./SettingPage.ts"></script>
<style lang="sass" src="./SettingPage.sass" scoped></style>
