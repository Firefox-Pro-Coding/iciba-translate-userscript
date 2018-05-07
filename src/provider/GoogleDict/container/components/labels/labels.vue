<template>
  <div
    class="iciba-google-dict-label-box iciba-inline"
    v-if="labels && labels.length">
    <div
      :class="[labelClass, 'iciba-label', 'iciba-inline']"
      v-for="(label, index) in labels"
      :key="index">
      {{ label }}
    </div>
  </div>
</template>

<script lang="ts" src="./labels.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';
  @import '~assets/styles/hardreset.less';

  .iciba-google-dict-label-box {
    font-size: 0;

    .iciba-label {
      font-size: 12px;
      background: @background-level-4;
      color: @main-level-4;
      padding: 1px 4px;

      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
</style>
