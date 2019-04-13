<template>
  <v-layout column>
    <icon-radio-group
      v-model="form.icon"
      :icons="iconOptions" />
    <p class="body-2 grey--text mt-1 mb-0">
      按钮图标
    </p>

    <v-checkbox
      class="mt-4"
      color="primary"
      hide-details
      v-model="form.display"
      label="显示按钮">
    </v-checkbox>
    <p class="body-2 grey--text mt-1 mb-0">
      在查词框右侧显示按钮
    </p>
  </v-layout>
</template>

<script lang="ts" src="./googleDict.ts"></script>
<style lang="less" src="./googleDict.less" scoped></style>
