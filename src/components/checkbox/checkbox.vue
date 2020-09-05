<template>
  <div
    class="checkbox flex items-center select-none cursor-pointer"
    @click="toggle"
  >
    <div
      class="icon relative"
      :class="{
        checked: value,
        'mr-2': !!label,
      }"
    >
      <i-icon size="100%" :svg="value ? icon.checked : icon.unchecked" />
      <div
        class="ripple absolute rounded-full"
        :class="{ checked: value }"
        v-ripple="{ center: true }"
      >
        <div class="ripple-trigger absolute" />
      </div>
    </div>
    <div class="label text-grey-700">{{ label }}</div>
  </div>
</template>

<script lang="ts" src="./checkbox.ts"></script>
<style lang="sass" src="./checkbox.sass" scoped></style>
