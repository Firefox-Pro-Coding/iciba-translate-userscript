<template>
  <transition name="c">
    <div
      :ref="refs.circle"
      v-show="state.visible"
      :style="computedStyle"
      class="iciba-circle absolute select-none overflow-hidden rounded-full"
      @contextmenu.prevent
      @mouseover="m.handleSelfMouseover"
      @mouseup="m.handleSelfMouseUp"
    />
  </transition>
</template>

<script lang="ts" src="./IcibaCircle.ts"></script>
<style src="./IcibaCircle.sass" lang="sass" scoped></style>
