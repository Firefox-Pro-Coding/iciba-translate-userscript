<template lang="icibahtml">
  <div class="iciba-size-helper"></div>
</template>

<script>
  import Vue from 'vue'

  export default class extends Vue {}
</script>
<style lang="less" scoped>
  @import '~assets/styles/variables.less';
  @import '~assets/styles/hardreset.less';

  .iciba-size-helper {
    .hard-reset();
  }
  div.iciba-size-helper {
    position: fixed;
    right: 0;
    bottom: 0;
    height: 0;
    width: 0;
    overflow: hidden;
  }
</style>
