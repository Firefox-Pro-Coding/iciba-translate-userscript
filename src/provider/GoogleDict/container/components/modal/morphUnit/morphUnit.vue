<template>
  <div class="morph-units-box">
    <div
      class="morph-units-item inline text-grey-500"
      :title="item.formType.posTag"
      v-for="(item, morphIndex) in props.morphUnits"
      :key="morphIndex"
    >
      <div class="morph-units-description inline">{{ item.formType.description }}&nbsp;</div>
      <div class="morph-units-word-form font-bold inline">{{ item.wordForm }}</div>
      <div class="morph-units-split inline">;&nbsp;</div>
    </div>
  </div>
</template>

<script lang="ts" src="./morphUnit.ts"></script>
