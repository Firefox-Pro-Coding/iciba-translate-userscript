<template>
  <div class="flex-col items-start">
    <icon-radio-group
      v-model="form.icon"
      :icons="iconOptions"
    />
    <p class="text-14 text-grey-500 mt-1 mb-0">
      按钮图标
    </p>

    <i-checkbox
      class="mt-4"
      v-model="form.display"
      label="显示按钮"
    />
    <p class="text-14 text-grey-500 mt-1 mb-0">
      在查词框右侧显示按钮
    </p>
  </div>
</template>

<script lang="ts" src="./vocabulary.ts"></script>
