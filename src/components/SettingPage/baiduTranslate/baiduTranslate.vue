<template>
  <v-layout column>
    <icon-radio-group
      v-model="form.icon"
      :icons="iconOptions" />
    <p class="body-2 grey--text mt-1 mb-0">
      小图标
    </p>
  </v-layout>
</template>

<script lang="ts" src="./baiduTranslate.ts"></script>
<style lang="less" src="./baiduTranslate.less" scoped></style>
