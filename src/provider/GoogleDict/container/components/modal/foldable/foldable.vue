<template>
  <div
    class="foldable-box w-full overflow-hidden ease-in-out duration-300"
    :style="state.foldableStyle"
  >
    <div ref="wrapper" class="foldable-wrapper">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" src="./foldable.ts"></script>
