<template>
  <transition name="iciba-setting-modal">
    <div
      class="iciba-setting-modal q-flex flex-center"
      :class="{ visible }"
      :style="{ zIndex: zIndex }"
      @click="handleCloseSetting"
      v-show="visible">
      <div class="iciba-setting-window q-flex-co elevation-8">
        <v-tabs
          v-model="tab"
          color="indigo"
          dark
          slider-color="rgba(255,255,255,0.7)">
          <v-tab ripple>core</v-tab>
          <v-tab ripple>iciba</v-tab>
          <v-tab ripple>google</v-tab>
          <v-tab ripple>google翻译</v-tab>
          <v-tab ripple>百度翻译</v-tab>
        </v-tabs>
        <v-tabs-items class="pa-3" v-model="tab">
          <v-tab-item>
            <core-setting></core-setting>
          </v-tab-item>
          <v-tab-item>hi2</v-tab-item>
          <v-tab-item>hi3</v-tab-item>
          <v-tab-item>hi4</v-tab-item>
          <v-tab-item>hi5</v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./SettingPage.ts"></script>
<style lang="less" src="./SettingPage.less" scoped></style>
