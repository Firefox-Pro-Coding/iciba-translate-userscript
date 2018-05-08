<template lang="icibahtml">
  <!-- entry item -->
  <div class="entry-item flex-co flex-stretch">

    <!-- headword -->
    <div class="headword flex flex-wrap">
      <div class="headword-word">
        {{ entry.syllabifiedHeadword || entry.headword }}
      </div>
      <div class="headword-graph-index" v-if="entry.homographIndex">{{ entry.homographIndex }}</div>
    </div>

    <!-- phonetics -->
    <phonetics class="phonetics-box" :phonetics="entry.phonetics"></phonetics>

    <!-- sense-family -->
    <div class="sense-family-box flex-co flex-stretch" v-if="entry.senseFamilies && entry.senseFamilies.length">
      <div
        class="sense-family-item flex-co flex-stretch"
        v-for="(senseFamilyItem, index) in entry.senseFamilies"
        :key="index">
        <div
          :title="item.qualifier"
          class="poss flex flex-wrap"
          v-for="(item, index) in senseFamilyItem.partsOfSpeechs"
          :key="index">
          {{ item.value }}
        </div>

        <!-- sense-list -->
        <div class="sense-list flex-co flex-stretch" v-if="senseFamilyItem.senses && senseFamilyItem.senses.length">
          <div
            class="sense-item flex"
            :class="{ collapsable: index !== 0 }"
            v-if="index < 2"
            v-for="(sense, index) in senseFamilyItem.senses"
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
    </div>
  </div>
</template>

<script lang="ts" src="./simpleEntry.ts"></script>

<style lang="less" src="./simpleEntry.less" scoped></style>
