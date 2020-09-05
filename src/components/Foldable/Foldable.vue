<template>
  <div
    class="w-full overflow-hidden"
    ref="root"
    :style="{
      height: state.height,
    }"
  >
    <div ref="wrapper" class="flex-col">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" src="./Foldable.ts"></script>
