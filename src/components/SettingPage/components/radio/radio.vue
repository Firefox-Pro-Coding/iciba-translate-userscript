<template>
  <div class="q-flex align-center flex-nogrow radio mr-3 mt-1 mb-1" @click="handleClick">
    <div class="icon" :class="{ checked }">
      <div v-ripple="{ center: true }" class="ripple" :class="{ checked }">
        <div class="ripple-trigger"></div>
      </div>
    </div>
    <div class="label">{{ label }}</div>
  </div>
</template>

<script lang="ts" src="./radio.ts"></script>
<style lang="less" src="./radio.less" scoped></style>
