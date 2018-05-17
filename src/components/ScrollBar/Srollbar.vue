<template>
  <div
    class="scroll-bar-container"
    :class="{ 'has-scroll-bar': !noScrollBar }">
    <div class="scroll-bar-scroll-container flex-co flex-stretch">
      <div
        :class="{ moving: drag.start }"
        class="scroll-bar-track"
        v-if="!noScrollBar"
        ref="scroll-bar-track">
        <div
          class="scroll-bar-thumb"
          ref="scroll-bar-thumb"
          @mousewheel.prevent
          @mousedown="handleScrollbarThumbClick"
          :style="scrollbarStyle.thumb">
        </div>
      </div>
      <slot ref="container" class="scroll-bar-content">
        <div></div>
      </slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';

  .scroll-bar-track {
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 100%;
    z-index: 2;

    &:hover, &.moving {
      .scroll-bar-thumb {
        left: 0;
        width: 8px;
        background: rgba(0, 0, 0, 0.25);
      }
    }

    .scroll-bar-thumb {
      display: flex;
      justify-content: center;
      position: absolute;
      width: 6px;
      height: 0;
      left: 1px;
      top: 0;
      border-radius: 100px;
      background: rgba(0, 0, 0, 0.15);
      cursor: pointer;
    }
  }

  .scroll-bar-container {
    padding: 8px 10px 10px 10px;

    .scroll-bar-scroll-container {
      position: relative;
      overflow-x: hidden;
      overflow-y: auto;

      .scroll-content {
        // TODO
      }
    }

    &.has-scroll-bar {
      padding-right: 4px;

      .scroll-bar-scroll-container {
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
        padding-right: 0;

        .scroll-content {
          // TODO
        }
      }
    }
  }

</style>
