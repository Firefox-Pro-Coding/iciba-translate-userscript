<template>
  <div class="flex-col items-start">
    <api-provider-common
      v-model:icon="form.icon"
      v-model:display="form.display"
      v-model:enable-hotkey="form.enableHotkey"
      v-model:hotkey="form.hotkey"
      v-model:app-id="form.appId"
      v-model:app-key="form.appKey"
      name="阿里API翻译"
      product-url="https://www.aliyun.com/product/ai/base_alimt"
      :icons="iconOptions"
    />

    <div class="flex mt-6 pt-1">
      <div class="flex-col items-start grow-0 pr-12">
        <div class="text-grey-600 pr-6 mb-2">语言</div>
        <div
          class="language-option text-16 text-grey-600 mb-2"
          v-for="n of languageOptions"
          :key="n.key"
        >
          {{ n.text }}
        </div>
      </div>
      <div class="flex-col items-center grow-0">
        <div class="text-grey-600 pr-6 mb-1">目标语言</div>
        <i-radio-group
          class="mt-0 grow-0"
          v-model="form.targetLanguage"
        >
          <i-radio
            v-for="n of languageOptions"
            :key="n.key"
            label=""
            :value="n.key"
          />
        </i-radio-group>
      </div>
    </div>
    <p class="text-14 text-grey-400 mt-1 mb-0">
      目标语言：默认翻译到的语言
    </p>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
