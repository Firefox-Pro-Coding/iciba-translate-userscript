<template>
  <div class="slider">
    <div ref="track" @click="handleTrackClick" class="q-flex track align-center">
      <div class="track-left" :style="{ width: `${position}%` }"></div>
      <div class="track-right" :style="{ width: `${100 - position}%` }"></div>
      <div
        ref="notch"
        @mousedown="handleMouseDown"
        :class="{ dragging: drag.dragging }"
        class="notch"
        :style="{ left: `${position}%` }">
      </div>
      <div
        class="bubble q-flex flex-center"
        :class="{ dragging: drag.dragging }"
        :style="{ left: `${position}%` }">
        <div class="text">{{ cachedValue }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./slider.ts"></script>
<style lang="less" src="./slider.less" scoped></style>
