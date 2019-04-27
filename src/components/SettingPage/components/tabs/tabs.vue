<template>
  <div class="flex tabs__div align-stretch">
    <div class="slider" :style="sliderStyle"></div>
    <div
      ref="tab"
      v-for="(item, index) of tabs"
      :key="index"
      @click="tab = index"
      :class="{ active: tab === index }"
      v-ripple="{ class: tab === index ? 'active-ripple' : 'inactive-ripple' }"
      class="tab__div flex flex-center">
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts" src="./tabs.ts"></script>
<style lang="less" src="./tabs.less" scoped></style>
