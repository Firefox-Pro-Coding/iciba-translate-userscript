<template>
  <transition name="iciba-setting-modal">
    <div
      class="iciba-setting-modal q-flex flex-center"
      :class="{ visible }"
      :style="{ zIndex: zIndex }"
      @click="handleCloseSetting"
      v-if="visible">
      <div class="iciba-setting-window q-flex-co elevation-8">
        <v-layout class="indigo flex-nogrow align-center">
          <!-- <div class="white--text px-3">设置</div> -->
          <v-tabs
            v-model="tab"
            color="indigo"
            dark
            slider-color="rgba(255,255,255,0.7)">
            <v-tab ripple>设置</v-tab>
            <v-tab ripple>core</v-tab>
            <v-tab ripple>iciba</v-tab>
            <v-tab ripple>google</v-tab>
            <v-tab ripple>google翻译</v-tab>
            <v-tab ripple>百度翻译</v-tab>
          </v-tabs>
        </v-layout>

        <v-tabs-items class="pa-3 fill-height" style="overflow: auto" v-model="tab">
          <v-tab-item><about /></v-tab-item>
          <v-tab-item><core-setting /></v-tab-item>
          <v-tab-item>别问，问就是还在写</v-tab-item>
          <v-tab-item>别问，问就是还在写</v-tab-item>
          <v-tab-item><google-translate /></v-tab-item>
          <v-tab-item>别问，问就是还在写</v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./SettingPage.ts"></script>
<style lang="less" src="./SettingPage.less" scoped></style>
