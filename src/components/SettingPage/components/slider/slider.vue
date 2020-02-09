<template>
  <div class="slider">
    <div class="track flex align-center" ref="track" @click="handleTrackClick">
      <div class="track-left" :style="{ width: `${position}%` }" />
      <div class="track-right" :style="{ width: `${100 - position}%` }" />
      <div
        ref="notch"
        @mousedown="handleNotchMouseDown"
        :class="{ dragging: state.drag.dragging }"
        class="notch"
        :style="{ left: `${position}%` }"
      />
      <div
        class="bubble flex flex-center"
        :class="{ dragging: state.drag.dragging }"
        :style="{ left: `${position}%` }"
      >
        <div class="text">{{ state.cachedValue }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./slider.ts"></script>
<style lang="less" src="./slider.less" scoped></style>
