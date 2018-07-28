<template>
  <!-- entry item -->
  <div class="entry-item">

    <!-- headword -->
    <div class="headword flex flex-wrap">
      <div class="headword-word">
        {{ entry.syllabifiedHeadword || entry.headword }}
      </div>
      <div class="headword-graph-index" v-if="entry.homographIndex">{{ entry.homographIndex }}</div>
    </div>


    <!-- phonetics -->
    <phonetics class="phonetics-box" :phonetics="entry.phonetics"></phonetics>

    <!-- labelSet -->
    <div class="entry-label-set-box" v-if="entry.labelSet && entry.labelSet.length">
      <label-set
        class="entry-label-set"
        size="large"
        :label-set="entry.labelSet">
      </label-set>
    </div>

    <!-- note -->
    <note :note="entry.note"></note>

    <!-- sense-family -->
    <div class="sense-family-box flex-co flex-stretch" v-if="entry.senseFamilies && entry.senseFamilies.length">
      <div class="sense-family-item flex-co flex-stretch" v-for="(senseFamilyItem, index) in entry.senseFamilies" :key="index">
        <!-- note -->
        <note :note="senseFamilyItem.note"></note>

        <!-- poss -->
        <div class="poss" v-if="senseFamilyItem.partsOfSpeechs && senseFamilyItem.partsOfSpeechs.length">
          <div
            :title="item.qualifier"
            class="pos flex flex-wrap"
            v-for="(item, index) in senseFamilyItem.partsOfSpeechs"
            :key="index">
            {{ item.value }}
          </div>
        </div>

        <!-- phonetics -->
        <phonetics class="phonetics-box" :phonetics="senseFamilyItem.phonetics"></phonetics>

        <!-- labelSet -->
        <div class="sense-family-label-set-box">
          <label-set
            class="sense-family-label-set"
            size="medium"
            :label-set="senseFamilyItem.labelSet">
          </label-set>
        </div>

        <!-- morph-units -->
        <div class="morph-units-box" v-if="senseFamilyItem.morphUnits && senseFamilyItem.morphUnits.length">
          <div
            class="morph-units-item iciba-inline"
            :title="item.formType.posTag"
            v-for="(item, index) in senseFamilyItem.morphUnits"
            :key="index">
            <div class="morph-units-description iciba-inline">{{ item.formType.description }}</div>
            <div class="morph-units-word-form iciba-inline">{{ item.wordForm }}</div>
            <div class="morph-units-split iciba-inline" v-if="index !== senseFamilyItem.morphUnits.length">;</div>
          </div>
        </div>

        <!-- sense-list -->
        <div class="sense-list flex-co flex-stretch" v-if="senseFamilyItem.senses && senseFamilyItem.senses.length">
          <div
            class="sense-item flex"
            :class="{ collapsable: index !== 0 }"
            v-for="(sense, index) in senseFamilyItem.senses"
            :key="index">
            <div class="sense-item-number">{{ index + 1 }}.</div>
            <div class="sense-item-box flex-co flex-stretch">
              <!-- difinition -->
              <div class="definition-box flex-co flex-stretch">
                <div class="difinition">
                  <!-- labelSet -->
                  <label-set
                    class="sense-item-label"
                    size="medium"
                    :label-set="sense.labelSet">
                  </label-set>

                  <fragment
                    class="difinition-text sense-frag"
                    :fragment="sense.definition.fragments">
                  </fragment>

                  <div class="sense-labels iciba-inline">
                    <!-- domain class -->
                    <labels
                      v-if="sense.domainClasses && sense.domainClasses.length"
                      class="sense-difinition-label-box"
                      color="lightpink"
                      size="small"
                      :labels="sense.domainClasses"
                      type="domain">
                    </labels>

                    <!-- semantic class -->
                    <labels
                      v-if="sense.semanticClasses && sense.semanticClasses.length"
                      class="sense-difinition-label-box"
                      color="lightblue"
                      size="small"
                      :labels="sense.semanticClasses"
                      type="semantic">
                    </labels>
                  </div>
                </div>


                <!-- example groups -->
                <example-groups :example-groups="sense.exampleGroups"></example-groups>

                <!-- thesaurus -->
                <thesaurus :thesaurus-entries="sense.thesaurusEntries"></thesaurus>

                <!-- subsense -->
                <div
                  class="subsense-box"
                  v-if="sense.subsenses && sense.subsenses.length">
                  <div
                    class="subsense-item flex"
                    v-for="(subsense, index) in sense.subsenses"
                    :key="index">
                    <div class="subsense-number">
                      {{ index + 1 }})
                    </div>
                    <div class="subsense-item-container flex-co flex-stretch">

                      <!-- definition -->
                      <div class="subsense-definition">
                        <!-- label -->
                        <label-set
                          class="subsense-definition-label"
                          size="medium"
                          :label-set="subsense.labelSet">
                        </label-set>

                        <fragment
                          class="subsense-frag"
                          :fragment="subsense.definition.fragments">
                        </fragment>

                        <!-- etymology -->
                        <etymology :etymology="subsense.etymology"></etymology>

                        <div class="subsense-labels iciba-inline">
                          <!-- domain class -->
                          <labels
                            v-if="subsense.domainClasses && subsense.domainClasses.length"
                            class="subsense-label-box"
                            color="lightpink"
                            size="small"
                            :labels="subsense.domainClasses"
                            type="domain">
                          </labels>

                          <!-- semantic class -->
                          <labels
                            v-if="subsense.semanticClasses && subsense.semanticClasses.length"
                            class="subsense-label-box"
                            color="lightblue"
                            size="small"
                            :labels="subsense.semanticClasses"
                            type="semantic">
                          </labels>
                        </div>
                      </div>

                      <!-- example groups -->
                      <example-groups :example-groups="subsense.exampleGroups"></example-groups>

                      <!-- thesaurus -->
                      <thesaurus :thesaurus-entries="subsense.thesaurusEntries"></thesaurus>
                    </div>
                  </div>
                </div>
              </div>

              <!-- etymology -->
              <etymology :etymology="sense.etymology"></etymology>

              <!-- note -->
              <!-- here could have note. but do not render at end of sense -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- etymology -->
    <etymology :etymology="entry.etymology"></etymology>

    <!-- sub entries -->
    <div class="sub-entry-box" v-if="entry.subentries && entry.subentries.length">
      <sub-entry
        class="sub-entry"
        :entry="subentry"
        v-for="(subentry, index) in entry.subentries"
        :key="index">
      </sub-entry>
    </div>
  </div>
</template>

<script lang="ts" src="./entry.ts"></script>

<style lang="less" src="./entry.less" scoped></style>
