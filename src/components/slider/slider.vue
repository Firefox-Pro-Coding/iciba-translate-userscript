<template>
  <div class="slider select-none">
    <div
      class="track flex items-center relative"
      :ref="refs.track"
      @click="handleTrackClick"
    >
      <div
        class="track-left bg-blue-700"
        :style="{ width: `${position}%` }"
      />
      <div
        class="track-right bg-grey-400"
        :style="{ width: `${100 - position}%` }"
      />
      <div
        class="notch absolute bg-blue-700 rounded-full ease-in-out duration-300"
        :class="{ dragging: state.drag.dragging }"
        :style="{ left: `${position}%` }"
        :ref="refs.notch"
        @mousedown="handleNotchMouseDown"
      />
      <div
        class="bubble flex flex-center bg-blue-700 absolute ease-in-out duration-300 transition-transform"
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
<style lang="sass" src="./slider.sass" scoped></style>
