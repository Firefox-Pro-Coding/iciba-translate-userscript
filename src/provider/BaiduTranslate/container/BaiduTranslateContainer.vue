<template>
  <div class="baidu-translate-container flex-co">
    <scroll-bar class="scroll-container" ref="scrollBox">
      <div class="baidu-translate-result-scroll-container flex-co">
        {{ translateResult }}
      </div>
    </scroll-bar>
  </div>
</template>

<script lang="ts" src="./BaiduTranslateContainer.ts"></script>
<style lang="less" src="./BaiduTranslateContainer.less" scoped></style>
