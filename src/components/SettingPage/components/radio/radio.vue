<template>
  <div class="flex align-center flex-nogrow radio mr-3 mt-1 mb-1">
    <div class="flex radio-wrapper" @click="handleClick">
      <div class="icon" :class="{ checked }">
        <i-icon size="100%" :svg="checked ? icon.checked : icon.unchecked" />
        <div v-ripple="{ center: true }" class="ripple" :class="{ checked }">
          <div class="ripple-trigger"></div>
        </div>
      </div>
      <div class="label">{{ label }}</div>
    </div>
  </div>
</template>

<script lang="ts" src="./radio.ts"></script>
<style lang="less" src="./radio.less" scoped></style>
