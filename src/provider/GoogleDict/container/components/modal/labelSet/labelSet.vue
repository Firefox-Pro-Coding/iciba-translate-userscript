<template>
  <div
    class="label-set-box text-0 inline"
    v-if="isValid"
  >
    <template v-for="key in Object.keys(props.labelSet)">
      <labels
        :size="props.size"
        class="inner-label-box"
        :labels="props.labelSet[key]"
        :type="key"
        :color="props.color || key"
        :key="key"
      />
    </template>
  </div>
</template>

<script lang="ts" src="./labelSet.ts"></script>
<style lang="less" scoped>
  @import '~assets/styles/variables.less';

  .inner-label-box {
    margin-right: 5px;
  }
</style>
