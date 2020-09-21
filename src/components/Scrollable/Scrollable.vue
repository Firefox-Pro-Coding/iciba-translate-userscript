<template>
  <div class="scrollable relative flex">
    <div
      class="scroll-bar-track absolute right-0"
      :class="{
        moving: state.drag.start,
        'hidden': state.noScrollBar,
      }"
    >
      <div
        class="scroll-bar-thumb rounded-full flex justify-center absolute ease-in-out duration-100"
        :style="thumbStyle"
        v-if="!state.noScrollBar"
        @wheel.prevent
        @mousedown="handleScrollbarThumbClick"
      />
    </div>
    <div class="scroll-content flex-col flex-auto overflow-hidden">
      <div
        class="scroll-box flex flex-auto overflow-x-hidden overflow-y-scroll"
        :style="scrollBoxStyle"
        @scroll="calcScrollbar"
        @mouseenter="calcScrollbar"
        :ref="refs.container"
        v-no-overscroll
      >
        <div
          class="w-full"
          :ref="refs.scrollBox"
        >
          <slot :scrollBar="!state.noScrollBar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Scrollable.ts"></script>
<style lang="sass" src="./Scrollable.sass" scoped></style>
