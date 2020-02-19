<template>
  <div
    class="radio flex justify-center flex-grow-0 select-none cursor-pointer mr-3 mt-1 mb-1"
    @click="handleClick"
  >
    <div class="icon relative mr-2" :class="{ checked: props.checked }">
      <i-icon size="100%" :svg="props.checked ? icon.checked : icon.unchecked" />
      <div
        class="ripple absolute rounded-full"
        :class="{
          checked: props.checked,
        }"
        v-ripple="{ center: true }"
      >
        <div class="ripple-trigger absolute" />
      </div>
    </div>
    <div class="label text-grey-600">{{ props.label }}</div>
  </div>
</template>

<script lang="ts" src="./radio.ts"></script>
<style lang="less" src="./radio.less" scoped></style>
