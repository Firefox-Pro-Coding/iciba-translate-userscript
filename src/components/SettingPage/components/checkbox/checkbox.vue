<template>
  <div class="flex align-center checkbox">
    <div class="flex check-box-wrapper" @click="toggle">
      <div class="icon" :class="{ checked: value }">
        <i-icon size="100%" :svg="value ? icon.checked : icon.unchecked" />
        <div v-ripple="{ center: true }" class="ripple" :class="{ checked: value }">
          <div class="ripple-trigger"></div>
        </div>
      </div>
      <div class="label grey--text text--darken-2">{{ label }}</div>
    </div>
  </div>
</template>

<script lang="ts" src="./checkbox.ts"></script>
<style lang="less" src="./checkbox.less" scoped></style>
