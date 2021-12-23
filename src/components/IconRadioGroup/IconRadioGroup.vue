<template>
  <div class="icon-radio flex select-none">
    <div
      class="icon-box flex relative p-2 grow-0"
      v-for="icon of props.icons"
      :key="icon.key"
      @click="handleSelect(icon.key)"
    >
      <i-icon v-if="icon.icon" size="100%" :svg="icon.icon" />
      <slot :name="icon.key" />
      <div
        class="check-icon absolute rounded-full bg-white text-20"
        v-if="icon.key === props.modelValue"
      >
        <i-icon size="20" :svg="checkedIconSvg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./IconRadioGroup.ts"></script>
<style lang="sass" src="./IconRadioGroup.sass" scoped></style>
