<template>
  <div class="flex-col items-start">
    <provider-common
      v-model:icon="form.icon"
      v-model:display="form.display"
      v-model:enable-hotkey="form.enableHotkey"
      v-model:hotkey="form.hotkey"
      name="百度翻译"
      :icons="iconOptions"
    />

    <div class="flex mt-6 pt-1">
      <div class="flex-col items-start flex-grow-0 pr-12">
        <div class="text-grey-600 pr-6 mb-2">语言</div>
        <div
          class="language-option text-16 text-grey-600 mb-2"
          v-for="n of languageOptions"
          :key="n.key"
        >
          {{ n.text }}
        </div>
      </div>
      <div class="flex-col items-center flex-grow-0">
        <div class="text-grey-600 pr-6 mb-1">首选语言</div>
        <i-radio-group
          class="mt-0 flex-grow-0"
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
      <div class="flex-col items-center flex-grow-0">
        <div class="text-grey-600 pr-6 mb-1">备选语言</div>
        <i-radio-group
          class="mt-0"
          v-model="form.secondTargetLanguage"
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
    <p
      v-if="form.targetLanguage === form.secondTargetLanguage"
      class="text-14 text-red-500 mt-2 mb-0"
    >
      首选语言和备选语言请选择不同的选项
    </p>
    <p class="text-14 text-grey-400 mt-1 mb-0">
      首选语言：默认翻译到的语言
      <br>
      备选语言：当检测到翻译文本语言为首选语言时，翻译到备选语言
    </p>
  </div>
</template>

<script lang="ts" src="./baiduTranslate.ts"></script>
