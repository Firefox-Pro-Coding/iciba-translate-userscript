<template>
  <div class="flex-co align-start">
    <icon-radio-group
      v-model="state.form.icon"
      :icons="iconOptions"
    />
    <p class="body-2 grey--text text--lighten-1 mt-1 mb-0">
      按钮图标
    </p>

    <i-checkbox
      class="mt-4"
      v-model="state.form.display"
      label="显示按钮"
    />
    <p class="body-2 grey--text text--lighten-1 mt-1 mb-0">
      在查词框右侧显示按钮
    </p>
  </div>
</template>

<script lang="ts" src="./vocabulary.ts"></script>
<style lang="less" src="./vocabulary.less" scoped></style>
