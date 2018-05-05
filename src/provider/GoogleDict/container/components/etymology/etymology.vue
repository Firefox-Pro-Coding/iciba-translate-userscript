<template>
  <div class="etymology-box flex-co" v-if="etymology">
    <div class="etymology-title">Origin</div>
    <div class="etymology-img-box" v-if="etymology.images">
      <img
        :style="{
          height: `${etymology.images.tablet.height / 2 }px`,
          width: `${etymology.images.tablet.width / 2 }px`,
        }"
        :src="`https://www.gstatic.com/onebox/dictionary/${etymology.images.tablet.url}`">
    </div>
    <div class="etymology-text">
      <fragment
        @entry-click="handleEntryLinkClick"
        class="etymology-frag"
        :fragment="etymology.etymology.fragments">
      </fragment>
    </div>
  </div>
</template>

<script lang="ts" src="./etymology.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';
  @import '~assets/styles/hardreset.less';

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
