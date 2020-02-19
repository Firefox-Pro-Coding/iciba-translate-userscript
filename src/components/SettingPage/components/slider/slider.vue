<template>
  <div class="slider select-none">
    <div
      class="track flex items-center relative"
      ref="track"
      @click="handleTrackClick"
    >
      <div class="track-left" :style="{ width: `${position}%` }" />
      <div class="track-right bg-grey-500" :style="{ width: `${100 - position}%` }" />
      <div
        class="notch absolute rounded-full ease-in-out duration-300"
        :class="{ dragging: state.drag.dragging }"
        :style="{ left: `${position}%` }"
        ref="notch"
        @mousedown="handleNotchMouseDown"
      />
      <div
        class="bubble flex flex-center absolute ease-in-out duration-300 transition-transform"
        :class="{ dragging: state.drag.dragging }"
        :style="{ left: `${position}%` }"
      >
        <div class="text text-white text-12">
          {{ state.cachedValue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./slider.ts"></script>
<style lang="less" src="./slider.less" scoped></style>
