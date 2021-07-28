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
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
