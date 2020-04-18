<template>
  <!-- note -->
  <div class="dict-note my-2 flex-col items-stretch" v-if="props.note">
    <div class="note-type-box flex mb-3px">
      <labels
        class="note-label-box"
        color="plain"
        size="large"
        :labels="[props.note.type]"
        type="note"
      />
    </div>
    <div class="note-text text-12 inline text-grey-500" v-html="props.note.text" />
  </div>
</template>

<script lang="ts" src="./note.ts"></script>
