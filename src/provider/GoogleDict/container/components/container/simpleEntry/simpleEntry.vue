<template>
  <!-- entry item -->
  <div class="entry-item flex-col items-stretch">
    <!-- headword -->
    <div class="headword flex flex-wrap">
      <div class="headword-word text-16">
        {{ props.entry.syllabifiedHeadword || props.entry.headword }}
      </div>
      <div
        class="headword-graph-index text-12 ml-2px"
        v-if="props.entry.homographIndex"
      >
        {{ props.entry.homographIndex }}
      </div>
    </div>

    <!-- phonetics -->
    <phonetics
      class="phonetics-box mb-2px"
      v-if="props.entry.phonetics"
      :phonetics="props.entry.phonetics"
    />

    <!-- sub-sense-list -->
    <div
      class="sense-list mt-2px flex-col items-stretch"
      v-if="props.isSubentry
        && props.entry.senseFamily
        && props.entry.senseFamily.senses
        && props.entry.senseFamily.senses.length"
    >
      <div
        class="sense-item flex"
        :class="{ collapsable: index !== 0 }"
        v-show="index < 2"
        v-for="(sense, index) in props.entry.senseFamily.senses"
        :key="index"
      >
        <div class="sense-item-number text-right">{{ index + 1 }}.</div>
        <div class="definition-box flex-auto">
          <fragment
            class="sense-frag"
            :fragment="sense.definition.fragments"
          />
        </div>
      </div>
    </div>

    <!-- sense-family -->
    <div
      class="sense-family-box flex-col items-stretch"
      v-if="!props.isSubentry
        && props.entry.senseFamilies
        && props.entry.senseFamilies.length"
    >
      <div
        class="sense-family-item flex-col items-stretch"
        v-for="(senseFamilyItem, senseFamilyItemIndex) in props.entry.senseFamilies"
        :key="senseFamilyItemIndex"
      >
        <template v-if="senseFamilyItem.partsOfSpeechs">
          <div
            :title="item.qualifier"
            class="poss italic flex flex-wrap text-grey-600"
            v-for="(item, index) in senseFamilyItem.partsOfSpeechs"
            :key="index"
          >
            {{ item.value }}
          </div>
        </template>

        <!-- phonetics -->
        <phonetics
          class="phonetics-box mb-2px"
          v-if="senseFamilyItem.phonetics"
          :phonetics="senseFamilyItem.phonetics"
        />

        <!-- sense-list -->
        <div
          class="sense-list mt-2px flex-col items-stretch"
          v-if="senseFamilyItem.senses && senseFamilyItem.senses.length"
        >
          <div
            class="sense-item flex"
            :class="{ collapsable: index !== 0 }"
            v-show="index < 2"
            v-for="(sense, index) in senseFamilyItem.senses"
            :key="index"
          >
            <div class="sense-item-number text-right">{{ index + 1 }}.</div>
            <div class="definition-box flex-auto">
              <fragment
                class="sense-frag"
                :fragment="sense.definition.fragments"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- sub entries -->
    <div class="sub-entry-box" v-if="props.entry.subentries && props.entry.subentries.length">
      <g-simple-entry
        class="sub-entry"
        :entry="subentry"
        :is-subentry="true"
        v-for="(subentry, index) in props.entry.subentries"
        :key="index"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./simpleEntry.ts"></script>
<style lang="sass" src="./simpleEntry.sass" scoped></style>
