<template>
  <!-- entry item -->
  <div class="entry-item flex-co align-stretch">
    <!-- headword -->
    <div class="headword flex flex-wrap">
      <div class="headword-word">
        {{ entry.syllabifiedHeadword || entry.headword }}
      </div>
      <div class="headword-graph-index" v-if="entry.homographIndex">{{ entry.homographIndex }}</div>
    </div>

    <!-- phonetics -->
    <phonetics class="phonetics-box" v-if="entry.phonetics" :phonetics="entry.phonetics"></phonetics>

    <!-- sense-family -->
    <div class="sense-family-box flex-co align-stretch" v-if="entry.senseFamilies && entry.senseFamilies.length">
      <div
        class="sense-family-item flex-co align-stretch"
        v-for="(senseFamilyItem, senseFamilyItemIndex) in entry.senseFamilies"
        :key="senseFamilyItemIndex">
        <div
          :title="item.qualifier"
          class="poss flex flex-wrap"
          v-for="(item, index) in senseFamilyItem.partsOfSpeechs"
          :key="index">
          {{ item.value }}
        </div>

        <!-- phonetics -->
        <phonetics class="phonetics-box" v-if="senseFamilyItem.phonetics" :phonetics="senseFamilyItem.phonetics"></phonetics>

        <!-- sense-list -->
        <div class="sense-list flex-co align-stretch" v-if="senseFamilyItem.senses && senseFamilyItem.senses.length">
          <div
            class="sense-item flex"
            :class="{ collapsable: index !== 0 }"
            v-show="index < 2"
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

    <!-- sub entries -->
    <div class="sub-entry-box" v-if="entry.subentries && entry.subentries.length">
      <simple-sub-entry
        class="sub-entry"
        :entry="subentry"
        v-for="(subentry, index) in entry.subentries"
        :key="index">
      </simple-sub-entry>
    </div>
  </div>
</template>

<script lang="ts" src="./simpleEntry.ts"></script>

<style lang="less" src="./simpleEntry.less" scoped></style>
