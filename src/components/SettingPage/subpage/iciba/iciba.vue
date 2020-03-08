<template>
  <div class="flex-col items-start">
    <provider-common
      :icon.sync="form.icon"
      :display.sync="form.display"
      :enable-hotkey.sync="form.enableHotkey"
      :hotkey.sync="form.hotkey"
      name="iciba"
      :icons="iconOptions"
    />
  </div>
</template>

<script lang="ts" src="./iciba.ts"></script>
