<template>
  <div class="q-flex align-center checkbox" @click="toggle">
    <div class="icon" :class="{ checked: value }">
      <div v-ripple="{ center: true }" class="ripple" :class="{ checked: value }">
        <div class="ripple-trigger"></div>
      </div>
    </div>
    <div class="label grey--text text--darken-2">{{ label }}</div>
  </div>
</template>

<script lang="ts" src="./checkbox.ts"></script>
<style lang="less" src="./checkbox.less" scoped></style>
