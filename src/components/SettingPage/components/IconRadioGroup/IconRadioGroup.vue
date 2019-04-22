<template>
  <div class="q-flex icon-radio">
    <div
      class="q-flex icon-box pa-2 flex-nogrow"
      @click="handleSelect(icon.key)"
      v-for="(icon, index) of icons"
      :key="index">
      <img :src="icon.icon" />
      <div
        v-if="icon.key === value"
        class="check-icon">
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./IconRadioGroup.ts"></script>
<style lang="less" src="./IconRadioGroup.less" scoped></style>
