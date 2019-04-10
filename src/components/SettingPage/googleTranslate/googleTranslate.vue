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
  </v-layout>
</template>

<script lang="ts" src="./googleTranslate.ts"></script>
<style lang="less" src="./googleTranslate.less" scoped></style>
