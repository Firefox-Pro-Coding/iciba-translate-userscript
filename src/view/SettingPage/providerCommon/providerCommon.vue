<template>
  <div class="flex-col items-start">
    <icon-radio-group
      :model-value="props.icon"
      @update:model-value="handleUpdateIcon($event)"
      :icons="props.icons"
    />
    <p class="text-14 text-grey-400 mt-1 mb-0">
      按钮图标
    </p>

    <i-checkbox-line
      :model-value="props.display"
      @update:model-value="handleUpdateDisplay($event)"
      label="显示按钮"
      text="输入框右侧显示按钮图标"
    />

    <i-checkbox-line
      :model-value="props.enableHotkey"
      @update:model-value="handleUpdateEnableHotkey($event)"
      label="启用热键翻译"
      text=""
    />

    <foldable :fold="!props.enableHotkey">
      <i-hotkey-input
        class="my-1"
        :model-value="props.hotkey"
        @update:model-value="handleUpdateHotkey($event)"
      />
    </foldable>

    <p class="text-14 text-grey-400 mb-0">
      选中文本后按下热键使用 {{ props.name }} 查词
    </p>
  </div>
</template>

<script lang="ts" src="./providerCommon.ts"></script>
