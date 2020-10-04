<template>
  <div class="thesaurus-row flex">
    <div class="tw-index text-grey-500 mr-1">
      {{ props.index + 1 }}.
    </div>
    <div>
      <labels
        class="nym-register mr-1"
        type="register"
        size="small"
        v-if="props.item.register"
        :labels="[props.item.register]"
      />
      <div
        class="nym-item inline-flex text-grey-400"
        v-for="(nym, nymIndex) in props.item.nyms"
        :class="{ 'is-core': nym.isCore }"
        :key="nymIndex"
      >
        <div
          @click="handleNymClick($event, nym)"
          :class="{ 'text-link cursor-pointer': nym.numEntries }"
          class="nym-content inline"
        >
          {{ nym.nym }}
        </div>
        <div
          v-if="nymIndex !== props.item.nyms.length - 1"
          class="nym-split inline pr-3px"
        >
          ,
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./thesaurusRow.ts"></script>
