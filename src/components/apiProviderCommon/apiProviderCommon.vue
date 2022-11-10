<template>
  <div class="flex-col items-start">
    <provider-common
      v-bind="$attrs"
    />

    <i-text-input-line
      class="app-info-text-input"
      :model-value="props.appId"
      @update:model-value="handleUpdateAppId($event)"
      label="应用程序 ID"
      placeholder="请输入应用程序 ID"
    />

    <i-text-input-line
      class="app-info-text-input"
      :model-value="props.appKey"
      @update:model-value="handleUpdateAppKey($event)"
      label="应用程序密钥"
      input-type="password"
      placeholder="请输入应用程序密钥"
    />
  </div>

  <div class="mt-2">
    <p class="text-14 text-grey-400 mt-1 mb-0">
      如果没有应用程序ID和密钥，
      <a :href="props.productUrl" target="_blank" rel="noopener">点我</a>
      注册并开通相应服务
    </p>
  </div>
</template>

<script lang="ts" src="./apiProviderCommon.ts"></script>
<style lang="sass" src="./apiProviderCommon.sass" scoped></style>
