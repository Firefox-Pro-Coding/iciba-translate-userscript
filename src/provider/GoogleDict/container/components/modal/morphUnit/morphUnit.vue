<template>
  <div class="morph-units-box">
    <div
      class="morph-units-item q-inline"
      :title="item.formType.posTag"
      v-for="(item, morphIndex) in props.morphUnits"
      :key="morphIndex"
    >
      <div class="morph-units-description q-inline">{{ item.formType.description }}&nbsp;</div>
      <div class="morph-units-word-form q-inline">{{ item.wordForm }}</div>
      <div class="morph-units-split q-inline">;&nbsp;</div>
    </div>
  </div>
</template>

<script lang="ts" src="./morphUnit.ts"></script>
<style lang="less" src="./morphUnit.less" scoped></style>
