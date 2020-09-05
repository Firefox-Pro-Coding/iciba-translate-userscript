<template>
  <div class="flex-col items-start">
    <provider-common
      :icon.sync="form.icon"
      :display.sync="form.display"
      :enable-hotkey.sync="form.enableHotkey"
      :hotkey.sync="form.hotkey"
      name="urban dictionary"
      :icons="iconOptions"
    />
    <i-checkbox-line
      v-model="form.display"
      label="显示按钮"
      text="在查词框右侧显示按钮"
    />
  </div>
</template>

<script lang="ts" src="./urbanDictionary.ts"></script>
