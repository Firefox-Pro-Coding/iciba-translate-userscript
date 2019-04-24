<template>
  <div class="google-translate-result-container q-flex-co">
    <scroll-bar class="scroll-container">
      <div class="google-translate-result-scroll-container q-flex-co">
        <div class="row" v-for="(row, index) of translateResult" :key="index">
          {{ row }}
        </div>
      </div>
    </scroll-bar>
  </div>
</template>

<script lang="ts" src="./SougouTranslateContainer.ts"></script>
<style lang="less" src="./SougouTranslateContainer.less" scoped></style>
