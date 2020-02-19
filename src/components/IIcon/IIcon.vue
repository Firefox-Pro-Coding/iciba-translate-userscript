<template>
  <div
    class="i-icon flex flex-center"
    :style="{
      height: computedSize,
      width: computedSize,
    }"
  >
    <img class="svg-img w-full h-full" :src="svgUrl" alt="">
  </div>
</template>

<script lang="ts" src="./IIcon.ts"></script>
