<template>
  <div id="setting-tab core-setting">
    <div class="list">
      <div class="list-item">
        <div class="label">查词引擎优先级</div>
        <v-checkbox
          color="primary"
          v-model="form.pressCtrlToDrag"
          label="按住ctrl拖拽">
        </v-checkbox>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./coreSetting.ts"></script>
<style lang="less" src="./coreSetting.less" scoped></style>
