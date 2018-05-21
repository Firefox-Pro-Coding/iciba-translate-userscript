<template>
  <div
    :style="{
      height: `${Number(height) / 2 }px`,
      width: `${Number(width) / 2 }px`,
    }"
    class="image-loader">
    <img
      :style="{
        height: `${Number(height) / 2 }px`,
        width: `${Number(width) / 2 }px`,
      }"
      :src="data" />
  </div>
</template>

<script lang="ts" src="./imageLoader.ts"></script>
