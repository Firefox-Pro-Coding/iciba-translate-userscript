<template>
  <div class="scrollable relative flex">
    <div
      class="scroll-bar-track absolute"
      :class="{
        moving: state.drag.start,
        'hidden': state.noScrollBar,
      }"
      ref="scroll-bar-track"
    >
      <div
        class="scroll-bar-thumb rounded-full flex justify-center absolute ease-in-out duration-100"
        :style="thumbStyle"
        v-if="!state.noScrollBar"
        @wheel.prevent
        @mousedown="handleScrollbarThumbClick"
        ref="scroll-bar-thumb"
      />
    </div>
    <div class="scroll-content flex-col flex-auto overflow-hidden">
      <div
        class="scroll-box flex flex-auto overflow-x-hidden overflow-y-scroll"
        :style="scrollBoxStyle"
        @scroll="calcScrollbar"
        @mouseenter="calcScrollbar"
        ref="container"
        v-no-overscroll
      >
        <div
          class="w-full"
          ref="scrollBox"
        >
          <slot :scroll-bar="!state.noScrollBar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Scrollable.ts"></script>
<style lang="sass" src="./Scrollable.sass" scoped></style>
