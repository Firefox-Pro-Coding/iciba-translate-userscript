<template>
  <div class="flex-col items-start">
    <provider-common
      v-model:icon="form.icon"
      v-model:display="form.display"
      v-model:enable-hotkey="form.enableHotkey"
      v-model:hotkey="form.hotkey"
      name="vocabulary.com"
      :icons="iconOptions"
    />

    <i-checkbox-line
      v-model="form.display"
      label="显示按钮"
      text="在查词框右侧显示按钮"
    />
  </div>
</template>

<script lang="ts" src="./vocabulary.ts"></script>
