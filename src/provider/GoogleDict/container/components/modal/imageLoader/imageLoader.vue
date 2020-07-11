<template>
  <div
    class="image-loader flex justify-center items-center"
    :class="{ loading: !state.data }"
    :style="{
      height: `${Number(props.height) / 2}px`,
      width: `${Number(props.width) / 2}px`,
    }"
  >
    <span
      class="placeholder text-grey-400 font-mono"
      v-if="!state.data"
    >
      loading....
    </span>
    <img
      v-if="state.data"
      :style="{
        height: `${Number(props.height) / 2}px`,
        width: `${Number(props.width) / 2}px`,
      }"
      :src="state.data"
    >
  </div>
</template>

<script lang="ts" src="./imageLoader.ts"></script>
<style lang="sass" src="./imageLoader.sass" scoped></style>
