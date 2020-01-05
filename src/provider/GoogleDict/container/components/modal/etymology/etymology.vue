<template>
  <div class="etymology-box flex-co align-stretch" v-if="props.etymology">
    <div class="etymology-title">Origin</div>
    <div
      class="etymology-img-box"
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
      color: #999;
    }
  }
</style>
