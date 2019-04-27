<template>
  <!-- entry item -->
  <div class="sub-entry-item flex-co align-stretch">
    <!-- headword -->
    <div class="headword flex flex-wrap">
      <div class="headword-word">
        {{ entry.syllabifiedHeadword || entry.headword }}
      </div>
      <div class="headword-graph-index" v-if="entry.homographIndex">{{ entry.homographIndex }}</div>
    </div>

    <!-- phonetics -->
    <phonetics class="phonetics-box" v-if="entry.phonetics" :phonetics="entry.phonetics"></phonetics>

    <!-- sense-list -->
    <div
      class="sense-list flex-co align-stretch"
      v-if="entry.senseFamily && entry.senseFamily.senses && entry.senseFamily.senses.length">
      <div
        class="sense-item flex"
        :class="{ collapsable: index !== 0 }"
        v-show="index < 2"
        v-for="(sense, index) in entry.senseFamily.senses"
        :key="index">
        <div class="sense-item-number">{{ index + 1 }}.</div>
        <div class="definition-box">
          <fragment
            class="sense-frag"
            :fragment="sense.definition.fragments">
          </fragment>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./simpleSubEntry.ts"></script>
<style lang="less" src="./simpleSubEntry.less" scoped></style>
