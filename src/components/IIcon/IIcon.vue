<template>
  <div
    class="i-icon flex flex-center"
    :style="{
      height: computedSize,
      width: computedSize,
    }"
  >
    <img class="svg-img flex-1 w-0" :src="svgUrl" alt="">
  </div>
</template>

<script lang="ts" src="./IIcon.ts"></script>
