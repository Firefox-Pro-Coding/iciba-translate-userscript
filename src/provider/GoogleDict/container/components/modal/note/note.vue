<template>
  <!-- note -->
  <div class="dict-note flex-co align-stretch" v-if="props.note">
    <div class="note-type-box flex">
      <labels
        class="note-label-box"
        color="plain"
        size="large"
        :labels="[props.note.type]"
        type="note"
      />
    </div>
    <div class="note-text q-inline" v-html="props.note.text" />
  </div>
</template>

<script lang="ts" src="./note.ts"></script>
<style lang="less" src="./note.less" scoped></style>
