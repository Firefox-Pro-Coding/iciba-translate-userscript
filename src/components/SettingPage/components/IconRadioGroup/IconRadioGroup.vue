<template>
  <div class="icon-radio flex">
    <div
      v-for="icon of props.icons"
      :key="icon.key"
      class="flex icon-box pa-2 flex-nogrow"
      @click="handleSelect(icon.key)"
    >
      <i-icon size="100%" :svg="icon.icon" />
      <div class="check-icon" v-if="icon.key === props.value">
        <i-icon size="20" :svg="checkedIconSvg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./IconRadioGroup.ts"></script>
<style lang="less" src="./IconRadioGroup.less" scoped></style>
