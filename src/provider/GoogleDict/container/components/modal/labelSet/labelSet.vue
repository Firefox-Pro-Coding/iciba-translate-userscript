<template>
  <div
    class="label-set-box text-0 inline"
    v-if="isValid"
  >
    <template v-for="key in Object.keys(props.labelSet)" :key="key">
      <labels
        :size="props.size"
        class="inner-label-box mr-5px"
        :labels="props.labelSet[key]"
        :type="key"
        :color="props.color || key"
      />
    </template>
  </div>
</template>

<script lang="ts" src="./labelSet.ts"></script>
