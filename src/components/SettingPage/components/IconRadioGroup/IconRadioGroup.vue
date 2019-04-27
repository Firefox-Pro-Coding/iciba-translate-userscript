<template>
  <div class="flex icon-radio">
    <div
      class="flex icon-box pa-2 flex-nogrow"
      @click="handleSelect(icon.key)"
      v-for="(icon, index) of icons"
      :key="index">
      <i-icon size="100%" :svg="icon.icon" />
      <div
        v-if="icon.key === value"
        class="check-icon">
        <i-icon size="20" :svg="checkIcon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./IconRadioGroup.ts"></script>
<style lang="less" src="./IconRadioGroup.less" scoped></style>
