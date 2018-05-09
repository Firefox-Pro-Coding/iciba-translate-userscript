<template lang="icibahtml">
  <div class="etymology-box flex-co flex-stretch" v-if="etymology">
    <div class="etymology-title">Origin</div>
    <div class="etymology-img-box" v-if="etymology.images">
      <image-loader
        :height="etymology.images.tablet.height"
        :width="etymology.images.tablet.width"
        :url="`https://www.gstatic.com/onebox/dictionary/${etymology.images.tablet.url}`">
      </image-loader>
    </div>
    <div class="etymology-text">
      <fragment
        class="etymology-frag"
        :fragment="etymology.etymology.fragments">
      </fragment>
    </div>
  </div>
</template>

<script lang="ts" src="./etymology.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';

  .etymology-box {
    margin: 10px 0 0 0;

    .etymology-title {
      font-size: 18px;
      color: @main-level-4;
    }

    .etymology-img-box {
      margin: 8px 0 0 0;

      img {
        max-width: 100%;
      }
    }

    .etymology-text {
      margin: 8px 0 0 0;
    }
  }
</style>
