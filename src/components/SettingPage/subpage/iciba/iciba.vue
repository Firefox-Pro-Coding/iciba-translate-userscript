<template>
  <div>
    <icon-radio-group
      v-model="form.icon"
      :icons="iconOptions" />
    <p class="body-2 grey--text mt-1 mb-0">
      按钮图标
    </p>

    <i-checkbox
      class="mt-4"
      v-model="form.display"
      label="显示按钮">
    </i-checkbox>
    <p class="body-2 grey--text mt-1 mb-0">
      在查词框右侧显示按钮
    </p>
  </div>
</template>

<script lang="ts" src="./iciba.ts"></script>
<style lang="less" src="./iciba.less" scoped></style>
