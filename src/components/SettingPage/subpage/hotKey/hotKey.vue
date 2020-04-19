<template>
  <div class="flex-col items-start">
    <i-checkbox-line
      class="mt-1"
      nomt
      v-model="core.useHotkeyShowUp"
      label="打开查词框热键"
      text="按热键在鼠标位置打开查词框"
    />

    <i-hotkey-input
      class="mt-6"
      v-model="core.showUpHotkey"
    />
    <p class="text-14 text-grey-400 mt-1 mb-0">
      打开查词框热键
    </p>

    <foldable :fold="!core.useHotkeyShowUp">
      <i-checkbox-line
        v-model="core.hotkeyIcibaMainInputAutoFocus"
        label="热键打开聚焦输入框"
        text="使用 打开查词框热键 打开查词框后，自动聚焦到输入框"
      />
    </foldable>

    <p class="text-14 text-grey-400 mt-8 mb-0">
      快速查词热键（选中文本按下热键直接查词）
    </p>
    <div class="">
      <div
        class="mt-2"
        v-for="provider of providerOptions"
        :key="provider.key"
      >
        <i-checkbox
          v-model="config[provider.key].enableHotkey"
          :label="provider.label"
        />
        <foldable :fold="!config[provider.key].enableHotkey">
          <i-hotkey-input
            class="mt-2 mb-2"
            v-model="config[provider.key].hotkey"
          />
        </foldable>
      </div>
    </div>

    <i-checkbox-line
      class="mt-6"
      nomt
      v-model="core.providerHotkeyAutoFocus"
      label="快速查词热键聚焦输入框"
    >
      使用 快速查词热键 查词后，自动聚焦到输入框
    </i-checkbox-line>

    <p class="text-14 text-grey-400 mt-6 mb-0">
      tips: 选中文字后按下定义的热键查词。
    </p>
    <p class="text-14 text-grey-400 mt-1 mb-0">
      若查词框已打开，按下热键使用对应的接口对输入框的内容查词。
    </p>
    <p class="text-14 text-grey-400 mt-1 mb-0">
      至少指定一种能打开查词框的方式（小圆圈或热键），否则你会无法打开查词框。
    </p>
    <p class="text-14 text-grey-400 mt-1 mb-0">
      请使用不和浏览器或操作系统产生冲突的热键。使用产生冲突的热键可能会不正常工作。
    </p>
  </div>
</template>

<script lang="ts" src="./hotKey.ts"></script>
