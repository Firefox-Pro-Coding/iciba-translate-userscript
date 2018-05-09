<template lang="icibahtml">
  <img
    :style="{
      height: `${Number(height) / 2 }px`,
      width: `${Number(width) / 2 }px`,
    }"
    :src="data">
</template>

<script lang="ts" src="./imageLoader.ts"></script>
