<template>
  <v-layout column>
    <v-radio-group
      class="mt-0"
      hide-details
      v-model="form.translateHost">
      <v-radio
        color="primary"
        v-for="n of hostOptions"
        :key="n.value"
        :label="n.label"
        :value="n.value">
      </v-radio>
    </v-radio-group>
    <p class="body-2 grey--text mt-1 mb-0">
      google翻译接口域名。
      <br>
      translate.google.cn 在国内大部分区域可直接访问
    </p>

    <v-layout class="mt-4 pt-1">
      <v-layout column class="flex-nogrow pr-5">
        <div class="grey--text text--darken-1 pr-4 mb-1">语言</div>
        <div
          class="grey--text text--darken-1"
          style="height: 24px; margin-bottom: 8px"
          v-for="n of languageOptions"
          :key="n.key">
          {{ n.text }}
        </div>
      </v-layout>
      <v-layout align-center column class="flex-nogrow">
        <div class="grey--text text--darken-1 pr-4">首选语言</div>
        <v-radio-group
          class="mt-0 flex-nogrow"
          hide-details
          v-model="form.targetLanguage">
          <v-radio
            color="primary"
            v-for="n of languageOptions"
            :key="n.key"
            label=""
            :value="n.key">
          </v-radio>
        </v-radio-group>
      </v-layout>
      <v-layout align-center column class="flex-nogrow">
        <div class="grey--text text--darken-1 pr-4">备选语言</div>
        <v-radio-group
          class="mt-0"
          hide-details
          v-model="form.secondTargetLanguage">
          <v-radio
            color="primary"
            v-for="n of languageOptions"
            :key="n.key"
            label=""
            :value="n.key">
          </v-radio>
        </v-radio-group>
      </v-layout>
    </v-layout>
    <p
      v-if="form.targetLanguage === form.secondTargetLanguage"
      class="body-2 error--text mt-2 mb-0">
      首选语言和备选语言请选择不同的选项
    </p>
    <p class="body-2 grey--text mt-1 mb-0">
      首选语言：默认翻译到的语言
      <br>
      备选语言：当检测到翻译文本语言为首选语言时，翻译到备选语言
    </p>

    <p class="body-2 grey--text mt-4 mb-0">
      ps：当出现 response with status code 503 时，有可能是触发了验证码。请手动打开google翻译点击验证码。
    </p>
  </v-layout>
</template>

<script lang="ts" src="./googleTranslate.ts"></script>
<style lang="less" src="./googleTranslate.less" scoped></style>
