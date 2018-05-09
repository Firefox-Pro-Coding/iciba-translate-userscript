<template lang="icibahtml">
  <div
    class="label-set-box iciba-inline"
    v-if="isValid">
    <labels
      :size="size"
      class="inner-label-box"
      v-for="key in Object.keys(labelSet)"
      :labels="labelSet[key]"
      :type="key"
      :color="color || key"
      :key="key">
    </labels>
  </div>
</template>

<script lang="ts" src="./labelSet.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';

  .label-set-box {
    font-size: 0;

    .inner-label-box {
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
</style>
