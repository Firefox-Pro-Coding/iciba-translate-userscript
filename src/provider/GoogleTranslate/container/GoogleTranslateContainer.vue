<template>
  <div class="google-translate-result-container flex-co">
    <scroll-bar class="scroll-container">
      <div class="google-translate-result-scroll-container flex-co">
        <div class="row" v-for="(row, index) of translateResult" :key="index">
          {{ row }}
        </div>
      </div>
    </scroll-bar>
  </div>
</template>

<script lang="ts" src="./GoogleTranslateContainer.ts"></script>

<style lang="less" src="./GoogleTranslateContainer.less" scoped></style>
