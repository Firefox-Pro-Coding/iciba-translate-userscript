<template>
  <div>
    <icon-radio-group
      v-model="form.icon"
      :icons="iconOptions" />
    <p class="body-2 grey--text text--lighten-1 mt-1 mb-0">
      按钮图标
    </p>

    <i-checkbox
      class="mt-4"
      v-model="form.display"
      label="显示按钮">
    </i-checkbox>
    <p class="body-2 grey--text text--lighten-1 mt-1 mb-0">
      在查词框右侧显示按钮
    </p>

    <div class="q-flex mt-4 pt-1">
      <div class="q-flex-co align-start flex-nogrow pr-5">
        <div class="grey--text text--darken-1 pr-4 mb-2">语言</div>
        <div
          class="grey--text text--darken-1"
          style="height: 24px; margin-bottom: 8px"
          v-for="n of languageOptions"
          :key="n.key">
          {{ n.text }}
        </div>
      </div>
      <div class="q-flex-co align-center flex-nogrow">
        <div class="grey--text text--darken-1 pr-4 mb-1">首选语言</div>
        <i-radio-group
          class="mt-0 flex-nogrow"
          v-model="form.targetLanguage">
          <i-radio
            v-for="n of languageOptions"
            :key="n.key"
            label=""
            :value="n.key">
          </i-radio>
        </i-radio-group>
      </div>
      <div class="q-flex-co align-center flex-nogrow">
        <div class="grey--text text--darken-1 pr-4 mb-1">备选语言</div>
        <i-radio-group
          class="mt-0"
          v-model="form.secondTargetLanguage">
          <i-radio
            v-for="n of languageOptions"
            :key="n.key"
            label=""
            :value="n.key">
          </i-radio>
        </i-radio-group>
      </div>
    </div>
    <p
      v-if="form.targetLanguage === form.secondTargetLanguage"
      class="body-2 red--text mt-2 mb-0">
      首选语言和备选语言请选择不同的选项
    </p>
    <p class="body-2 grey--text text--lighten-1 mt-1 mb-0">
      首选语言：默认翻译到的语言
      <br>
      备选语言：当检测到翻译文本语言为首选语言时，翻译到备选语言
    </p>
  </div>
</template>

<script lang="ts" src="./baiduTranslate.ts"></script>
<style lang="less" src="./baiduTranslate.less" scoped></style>
