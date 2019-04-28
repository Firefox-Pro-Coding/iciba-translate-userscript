<template>
  <div class="google-translate-result-container flex-co">
    <scrollable class="scroll-container">
      <div class="google-translate-result-scroll-container flex-co">
        <div class="row" v-for="(row, index) of translateResult" :key="index">
          {{ row }}
        </div>
      </div>
    </scrollable>
  </div>
</template>

<script lang="ts" src="./SougouTranslateContainer.ts"></script>
<style lang="less" src="./SougouTranslateContainer.less" scoped></style>
