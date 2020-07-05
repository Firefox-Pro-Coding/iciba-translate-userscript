<template>
  <div
    class="foldable-box w-full ease-in-out duration-300 overflow-hidden"
    :style="{
      height: state.height,
    }"
  >
    <div ref="wrapper" class="foldable-wrapper flex-col">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" src="./Foldable.ts"></script>
