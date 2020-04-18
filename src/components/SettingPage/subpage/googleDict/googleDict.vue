<template>
  <div class="flex-col items-start">
    <provider-common
      :icon.sync="form.icon"
      :display.sync="form.display"
      :enable-hotkey.sync="form.enableHotkey"
      :hotkey.sync="form.hotkey"
      name="google字典"
      :icons="iconOptions"
    />

    <i-radio-group
      class="mt-4"
      v-model="form.foldStatus"
    >
      <i-radio
        v-for="n of foldOptions"
        :key="n.key"
        :label="n.label"
        :value="n.key"
      />
    </i-radio-group>
    <p class="text-14 text-grey-400 mt-1 mb-0">
      查词详细结果默认折叠状态
    </p>

    <p class="text-14 text-grey-400 mt-5 mb-0">
      如果你经常出现 request failed 0，这不是脚本出问题也不是网络问题。
    </p>
    <p class="text-14 text-grey-400 mt-1 mb-0">
      google 的 api 会在查不到结果时返回 500，而 chrome 检测到 500 后会自动启动 ddos 防御，所有相同的请求会被拦截。
    </p>
    <p class="text-14 text-grey-400 mt-1 mb-0">
      添加 chrome 启动参数 --disable-extensions-http-throttling 可以关闭此功能。
    </p>
    <p class="text-14 text-grey-400 mt-1 mb-0">
      解决方案是，过一段时间再使用 google 字典，或者避免使用 google 字典查询查不到的单词。
    </p>
    <p class="text-14 text-grey-400 mt-1 mb-0">
      <a href="http://dev.chromium.org/throttling" _target="blank">http://dev.chromium.org/throttling</a>
    </p>
  </div>
</template>

<script lang="ts" src="./googleDict.ts"></script>
