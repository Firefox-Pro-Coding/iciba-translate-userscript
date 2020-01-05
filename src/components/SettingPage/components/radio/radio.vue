<template>
  <div
    class="radio flex align-center flex-nogrow mr-3 mt-1 mb-1"
    @click="handleClick"
  >
    <div class="icon mr-2" :class="{ checked: props.checked }">
      <i-icon size="100%" :svg="props.checked ? icon.checked : icon.unchecked" />
      <div
        class="ripple"
        :class="{
          checked: props.checked,
        }"
        v-ripple="{ center: true }"
      >
        <div class="ripple-trigger" />
      </div>
    </div>
    <div class="label">{{ props.label }}</div>
  </div>
</template>

<script lang="ts" src="./radio.ts"></script>
<style lang="less" src="./radio.less" scoped></style>
