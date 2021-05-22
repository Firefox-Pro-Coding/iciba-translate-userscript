<template>
  <div class="flex-col items-start">
    <provider-common
      v-model:icon="form.icon"
      v-model:display="form.display"
      v-model:enable-hotkey="form.enableHotkey"
      v-model:hotkey="form.hotkey"
      name="iciba"
      :icons="iconOptions"
    />

    <i-checkbox-line
      v-model="form.lowerCaseCapital"
      label="查词首字母转换小写"
      text="查词的单词首字母自动转换为小写"
    />
  </div>
</template>

<script lang="ts" src="./iciba.ts"></script>
