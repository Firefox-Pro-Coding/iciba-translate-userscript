<template>
  <div class="flex-col items-start">
    <icon-radio-group
      :value="props.icon"
      @input="ctx.emit('update:icon', $event)"
      :icons="props.icons"
    />
    <p class="text-14 text-grey-400 mt-1 mb-0">
      按钮图标
    </p>

    <i-checkbox-line
      :value="props.display"
      @input="ctx.emit('update:display', $event)"
      label="显示按钮"
      text="在查词框右侧显示按钮"
    />

    <i-checkbox-line
      :value="props.enableHotkey"
      @input="ctx.emit('update:enableHotkey', $event)"
      label="启用热键翻译"
      :text="`选中文本后按下热键使用 ${props.name} 查词`"
    />

    <foldable :fold="!props.enableHotkey">
      <i-hotkey-input
        class="mt-3"
        :value="props.hotkey"
        @input="ctx.emit('update:hotkey', $event)"
      />
      <p class="text-14 text-grey-400 mt-1 mb-0">
        查词热键
      </p>
    </foldable>
  </div>
</template>

<script lang="ts" src="./providerCommon.ts"></script>
