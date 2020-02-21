<template>
  <!-- entry item -->
  <div class="entry-item">
    <!-- sub-entry-lemma -->
    <div class="sub-entry-lemma" v-if="isSub">
      {{ e.lemma }}
      <labels
        class="entry-type-label-box"
        color="plain"
        size="medium"
        :labels="[e.type]"
        type="entry-type"
      />
    </div>

    <!-- sub-entry-triggeringPhrases -->
    <div class="triggering-phrases text-grey-500" v-if="e.triggeringPhrases">
      <span
        class="t-phrase-item"
        v-for="(phrase, pIndex) of e.triggeringPhrases"
        :key="pIndex"
      >
        {{ phrase }}{{ pIndex !== e.triggeringPhrases.length - 1 ? ',' : '' }}
      </span>
    </div>


    <!-- headword -->
    <div class="headword flex flex-wrap">
      <div class="headword-word text-28" :title="e.locale">
        {{ e.syllabifiedHeadword || e.headword }}
      </div>
      <div
        class="headword-graph-index text-14 ml-2px"
        v-if="e.homographIndex"
      >
        {{ e.homographIndex }}
      </div>
    </div>

    <!-- phonetics -->
    <phonetics class="phonetics-box mb-1" :phonetics="e.phonetics" />

    <!-- labelSet -->
    <div class="entry-label-set-box" v-if="e.labelSet && e.labelSet.length">
      <label-set
        class="entry-label-set"
        size="large"
        :label-set="e.labelSet"
      />
    </div>

    <!-- note -->
    <note :note="e.note" />

    <!-- sub-sense-list -->
    <div
      class="sub-sense-list mt-1 flex-col items-stretch"
      v-if="isSub && e.senseFamily && e.senseFamily.senses && e.senseFamily.senses.length"
    >
      <!-- senseFamily labelSet -->
      <label-set
        class="sense-item-label"
        size="medium"
        :label-set="e.senseFamily.labelSet"
      />

      <sense-item
        class="sense-item"
        :class="{ collapsable: senseIndex !== 0 }"
        v-for="(sense, senseIndex) in e.senseFamily.senses"
        :sense="sense"
        :index="senseIndex"
        :key="senseIndex"
      />
    </div>

    <!-- sense-family -->
    <div
      class="sense-family-box flex-col items-stretch"
      v-if="!isSub && e.senseFamilies && e.senseFamilies.length"
    >
      <div class="sense-family-item flex-col items-stretch" v-for="(senseFamilyItem, index) in e.senseFamilies" :key="index">
        <!-- note -->
        <note :note="senseFamilyItem.note" />

        <!-- poss -->
        <div class="poss italic" v-if="senseFamilyItem.partsOfSpeechs && senseFamilyItem.partsOfSpeechs.length">
          <div
            :title="poss.qualifier"
            class="pos flex flex-wrap"
            v-for="(poss, possIndex) in senseFamilyItem.partsOfSpeechs"
            :key="poss.value + possIndex"
          >
            {{ poss.value }}
          </div>
        </div>

        <!-- phonetics -->
        <phonetics class="phonetics-box" :phonetics="senseFamilyItem.phonetics" />

        <!-- labelSet -->
        <div class="sense-family-label-set-box">
          <label-set
            class="sense-family-label-set"
            size="medium"
            :label-set="senseFamilyItem.labelSet"
          />
        </div>

        <!-- morph-units -->
        <morph-unit
          v-if="senseFamilyItem.morphUnits && senseFamilyItem.morphUnits.length"
          :morph-units="senseFamilyItem.morphUnits"
        />

        <!-- sense-list -->
        <div
          class="sense-list flex-col items-stretch mt-2px"
          v-if="senseFamilyItem.senses && senseFamilyItem.senses.length"
        >
          <sense-item
            class="sense-item"
            :class="{ collapsable: index !== 0 }"
            v-for="(sense, senseIndex) in senseFamilyItem.senses"
            :sense="sense"
            :index="senseIndex"
            :key="senseIndex"
          />
        </div>
      </div>
    </div>

    <!-- etymology -->
    <etymology :etymology="e.etymology" />

    <!-- sub entries -->
    <div class="sub-entry-box" v-if="e.subentries && e.subentries.length">
      <g-entry
        class="sub-entry"
        :entry="subentry"
        :is-subentry="true"
        v-for="(subentry, index) in e.subentries"
        :key="index"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./entry.ts"></script>
<style lang="less" src="./entry.less" scoped></style>
