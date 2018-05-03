<template>
  <div
    class="label-set flex"
    v-if="isValid">
    <template v-for="(key, index) in Object.keys(labelSet)">
      <div
        class="general-label-box flex"
        :key="index">
        <span
          :class="[`${key}-label`, 'label']"
          v-for="(label, index) in labelSet[key]"
          :key="index">
          {{ label }}
        </span>
      </div>
    </template>

  </div>
</template>

<script lang="ts" src="./labelSet.ts">
</script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';
  @import '~assets/styles/hardreset.less';

  .label-set {
    .general-label-box {
      &:not(:last-child) {
        margin-right: 5px;
      }

      .label {
        font-size: 12px;
        text-transform: uppercase;
        background: @background-level-4;
        color: @main-level-3-5;
        padding: 3px 5px;

        &:not(:last-child) {
          margin-right: 5px;
        }

        &.registers-label {
          font-size: inherit;
          font-style: italic;
          color: @main-level-4;
          text-transform: none;
          background: none;
          padding: 0;
        }
      }
    }
  }
</style>
