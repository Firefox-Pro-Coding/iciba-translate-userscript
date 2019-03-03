<template>
  <!-- note -->
  <div class="dict-note q-flex-co align-stretch" v-if="note">
    <div class="note-type-box q-flex">
      <labels
        class="note-label-box"
        color="plain"
        size="large"
        :labels="[note.type]"
        type="note">
      </labels>
    </div>
    <div class="note-text iciba-inline" v-html="note.text"></div>
  </div>
</template>

<script lang="ts" src="./note.ts"></script>

<style lang="less" src="./note.less" scoped></style>
