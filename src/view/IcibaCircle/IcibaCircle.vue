<template>
  <transition name="c">
    <div
      class="iciba-circle absolute select-none overflow-hidden flex flex-center"
      :class="{
        'has-icon': !!iconUrl,
        [iconType]: true,
      }"
      :ref="refs.circle"
      v-show="state.visible"
      :style="computedStyle"
      @contextmenu.prevent
      @mouseover="m.handleSelfMouseover"
      @mouseup="m.handleSelfMouseUp"
    >
      <i-icon class="flex-1" :size="false" v-if="iconUrl" :svg="iconUrl" />
    </div>
  </transition>
</template>

<script lang="ts" src="./IcibaCircle.ts"></script>
<style src="./IcibaCircle.sass" lang="sass" scoped></style>
