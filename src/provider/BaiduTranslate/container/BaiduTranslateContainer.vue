<template>
  <div class="baidu-translate-container flex-co">
    <scroll-bar class="scroll-container">
      <div class="baidu-translate-result-scroll-container flex-co">
        <div class="row" v-for="(row, index) of translateResult" :key="index">
          {{ row }}
        </div>
      </div>
    </scroll-bar>
  </div>
</template>

<script lang="ts" src="./BaiduTranslateContainer.ts"></script>
<style lang="less" src="./BaiduTranslateContainer.less" scoped></style>
