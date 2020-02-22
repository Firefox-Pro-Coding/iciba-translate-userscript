<template>
  <div class="morph-units-box">
    <div
      class="morph-units-item text-0 inline"
      :title="item.formType.posTag"
      v-for="(item, morphIndex) in props.morphUnits"
      :key="morphIndex"
    >
      <div class="morph-units-description inline">{{ item.formType.description }}&nbsp;</div>
      <div class="morph-units-word-form inline">{{ item.wordForm }}</div>
      <div class="morph-units-split inline">;&nbsp;</div>
    </div>
  </div>
</template>

<script lang="ts" src="./morphUnit.ts"></script>
<style lang="sass" src="./morphUnit.sass" scoped></style>
