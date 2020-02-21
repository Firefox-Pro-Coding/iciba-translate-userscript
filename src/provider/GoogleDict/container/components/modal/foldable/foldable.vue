<template>
  <div
    class="foldable-box w-full ease-in-out duration-300"
    :style="state.foldableStyle"
  >
    <div ref="wrapper" class="foldable-wrapper flex-col">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" src="./foldable.ts"></script>
