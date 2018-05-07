<template>
  <div
    class="label-set-box"
    v-if="isValid">
    <labels
      class="inner-label-box"
      v-for="key in Object.keys(labelSet)"
      :labels="labelSet[key]"
      :type="key"
      :key="key">
    </labels>
  </div>
</template>

<script lang="ts" src="./labelSet.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';
  @import '~assets/styles/hardreset.less';

  .label-set-box {
    font-size: 0;

    .inner-label-box {
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
</style>
