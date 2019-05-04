<template>
  <div class="google-translate-result-container flex-co">
    <scrollable
      :no-scroll-bar-style="{ 'padding-right': '10px' }"
      :scroll-bar-style="{ 'padding-right': '2px' }"
      class="scroll-container">
      <div class="google-translate-result-scroll-container flex-co">
        <div class="row" v-for="(row, index) of translateResult" :key="index">
          {{ row }}
        </div>
      </div>
    </scrollable>
  </div>
</template>

<script lang="ts" src="./GoogleTranslateContainer.ts"></script>

<style lang="less" src="./GoogleTranslateContainer.less" scoped></style>
