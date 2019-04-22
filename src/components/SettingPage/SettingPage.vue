<template>
  <transition name="iciba-setting-modal">
    <div
      class="iciba-setting-modal q-flex flex-center"
      :class="{ visible }"
      :style="{ zIndex: zIndex }"
      @click="handleCloseSetting"
      v-if="visible">
      <div class="iciba-setting-window q-flex-co elevation-8">
        <div class="indigo flex-nogrow align-center">
          <tabs
            v-model="tab"
            color="indigo"
            dark
            :tabs="[
              '设置',
              'core',
              'iciba',
              'google字典',
              'google翻译',
              '百度翻译',
            ]"
            slider-color="rgba(255,255,255,0.7)" />
        </div>

        <tabs-items class="fill-height" style="overflow: auto" v-model="tab">
          <tab-item class="pa-3"><about /></tab-item>
          <tab-item class="pa-3"><core-setting /></tab-item>
          <tab-item class="pa-3"><iciba /></tab-item>
          <tab-item class="pa-3"><google-dict /></tab-item>
          <tab-item class="pa-3"><google-translate /></tab-item>
          <tab-item class="pa-3"><baidu-translate /></tab-item>
        </tabs-items>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./SettingPage.ts"></script>
<style lang="less" src="./SettingPage.less" scoped></style>
