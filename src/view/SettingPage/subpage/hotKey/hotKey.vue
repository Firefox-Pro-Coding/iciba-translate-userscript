<template>
  <div class="flex-col items-start">
    <i-checkbox-line
      class="mt-1"
      nomt
      v-model="core.useHotkeyShowUp"
      label="呼出查词框热键"
      text=""
    />

    <foldable :fold="!core.useHotkeyShowUp">
      <i-hotkey-input
        class="my-1"
        v-model="core.showUpHotkey"
      />
    </foldable>

    <p class="text-14 text-grey-400 mb-0">
      热键显示查词框
    </p>


    <foldable :fold="!core.useHotkeyShowUp">
      <i-checkbox-line
        v-model="core.hotkeyIcibaMainInputAutoFocus"
        label="呼出查词框时聚焦输入"
        text="呼出查词框 后，聚焦到输入框"
      />
    </foldable>

    <p class="text-14 text-grey-400 mt-8 mb-0">
      快速查词热键（选中文本 或在输入框 快速查词）
    </p>
    <div class="">
      <div
        class="mt-2"
        v-for="provider of providers"
        :key="provider.id"
      >
        <i-checkbox
          v-model="provider.store.enableHotkey"
          :label="provider.label"
        />
        <foldable :fold="!provider.store.enableHotkey">
          <i-hotkey-input
            class="my-1"
            v-model="provider.store.hotkey"
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
      使用 快速查词热键后，自动聚焦到输入框
    </i-checkbox-line>

    <p class="text-14 text-grey-400 mt-6 mb-0">
      tips:
    </p>
    <p
      class="text-14 text-grey-400 mt-1 mb-0"
      v-for="(line, index) of [
        '选中文字 按下热键查词。',
        '或在输入框输入文字，按下热键使用对应的接口查词。',
        '至少指定一种能打开查词框的方式（小圆圈或热键），否则你会无法打开查词框。',
        '请避免使用和浏览器或操作系统产生冲突的热键。',
      ]"
      :key="index"
    >
      {{ index + 1 }}. {{ line }}
    </p>
  </div>
</template>

<script lang="ts" src="./hotKey.ts"></script>
