<template>
  <div class="etymology-box flex-col items-stretch" v-if="props.etymology">
    <div class="etymology-title text-18">Origin</div>
    <div
      class="etymology-img-box mt-2"
      v-if="props.etymology.images"
    >
      <image-loader
        :height="props.etymology.images.tablet.height"
        :width="props.etymology.images.tablet.width"
        :url="`https://www.gstatic.com/onebox/dictionary/${props.etymology.images.tablet.url}`"
      />
    </div>
    <div class="etymology-text">
      <fragment
        class="etymology-frag"
        :fragment="props.etymology.etymology.fragments"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./etymology.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';

  .etymology-box {
    border-top: 1px solid @border-level-1;
    padding: 10px 0 0 0;
    margin: 10px 0 0 0;

    .etymology-title {
      color: @main-level-4;
    }

    .etymology-img-box {
      img {
        max-width: 100%;
      }
    }

    .etymology-text {
      margin: 8px 0 0 0;
      color: #999;
    }
  }
</style>
