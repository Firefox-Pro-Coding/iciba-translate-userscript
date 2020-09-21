<template>
  <div
    class="w-full overflow-hidden"
    :ref="refs.root"
    :style="{
      height: state.height,
    }"
  >
    <div
      class="flex-col"
      :ref="refs.wrapper"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" src="./Foldable.ts"></script>
