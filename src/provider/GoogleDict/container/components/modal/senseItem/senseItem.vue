<template>
  <div class="sense-item flex">
    <div class="sense-item-number">{{ index + 1 }}.</div>
    <div class="sense-item-box flex-co align-stretch">
      <!-- difinition -->
      <div class="definition-box flex-co align-stretch">
        <div class="difinition">
          <!-- labelSet -->
          <label-set
            class="sense-item-label"
            size="medium"
            :label-set="s.labelSet"
          />

          <fragment
            class="difinition-text sense-frag"
            :fragment="s.definition.fragments"
          />

          <div class="sense-labels q-inline">
            <!-- domain class -->
            <labels
              v-if="s.domainClasses && s.domainClasses.length"
              class="sense-difinition-label-box"
              color="lightpink"
              size="small"
              :labels="s.domainClasses"
              type="domain"
            />

            <!-- semantic class -->
            <labels
              v-if="s.semanticClasses && s.semanticClasses.length"
              class="sense-difinition-label-box"
              color="lightblue"
              size="small"
              :labels="s.semanticClasses"
              type="semantic"
            />
          </div>
        </div>


        <!-- example groups -->
        <example-groups :example-groups="s.exampleGroups" />

        <!-- thesaurus -->
        <thesaurus :thesaurus-entries="s.thesaurusEntries" />

        <!-- subsense -->
        <foldable :fold="store.state.googleDict.subsenseFolded" v-if="s.subsenses && s.subsenses.length">
          <div class="subsense-box" v-if="s.subsenses && s.subsenses.length">
            <div
              v-for="(subsense, subsenseIndex) in sense.subsenses"
              :key="subsenseIndex"
              class="subsense-item flex"
            >
              <div class="subsense-number pr-2 grey--text text--darken-1">
                {{ subsenseIndex + 1 }})
              </div>
              <div class="subsense-item-container flex-co align-stretch">
                <!-- definition -->
                <div class="subsense-definition">
                  <!-- label -->
                  <label-set
                    class="subsense-definition-label"
                    size="medium"
                    :label-set="subsense.labelSet"
                  />

                  <span class="subsense-definition-split">&nbsp;</span>

                  <fragment
                    class="subsense-frag"
                    :fragment="subsense.definition.fragments"
                  />

                  <!-- etymology -->
                  <etymology :etymology="subsense.etymology" />

                  <div class="subsense-labels q-inline">
                    <!-- domain class -->
                    <labels
                      v-if="subsense.domainClasses && subsense.domainClasses.length"
                      class="subsense-label-box"
                      color="lightpink"
                      size="small"
                      :labels="subsense.domainClasses"
                      type="domain"
                    />

                    <!-- semantic class -->
                    <labels
                      v-if="subsense.semanticClasses && subsense.semanticClasses.length"
                      class="subsense-label-box"
                      color="lightblue"
                      size="small"
                      :labels="subsense.semanticClasses"
                      type="semantic"
                    />
                  </div>
                </div>

                <!-- example groups -->
                <example-groups :example-groups="subsense.exampleGroups" />

                <!-- thesaurus -->
                <thesaurus :thesaurus-entries="subsense.thesaurusEntries" />
              </div>
            </div>
          </div>
        </foldable>
      </div>

      <!-- etymology -->
      <etymology :etymology="s.etymology" />

      <!-- note -->
      <!-- here could have note. but do not render at end of sense -->
    </div>
  </div>
</template>

<script lang="ts" src="./senseItem.ts"></script>
<style lang="less" src="./senseItem.less" scoped></style>
