<template>
  <div class="sense-item flex">
    <div class="sense-item-number text-right font-bold">
      {{ index + 1 }}.
    </div>
    <div class="sense-item-box flex-col flex-auto items-stretch">
      <!-- difinition -->
      <div class="definition-box flex-auto flex-col items-stretch">
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

          <div class="sense-labels inline">
            <!-- domain class -->
            <labels
              v-if="s.domainClasses && s.domainClasses.length"
              class="ml-5px"
              color="lightpink"
              size="small"
              :labels="s.domainClasses"
              type="domain"
            />

            <!-- semantic class -->
            <labels
              v-if="s.semanticClasses && s.semanticClasses.length"
              class="ml-5px"
              color="lightblue"
              size="small"
              :labels="s.semanticClasses"
              type="semantic"
            />
          </div>
        </div>


        <!-- example groups -->
        <example-groups :example-groups="combinedGroups" />

        <!-- thesaurus -->
        <thesaurus :thesaurus-entries="s.thesaurusEntries" />

        <!-- subsense -->
        <foldable
          :fold="subSenseFolded"
          v-if="s.subsenses && s.subsenses.length"
        >
          <div class="subsense-box" v-if="s.subsenses && s.subsenses.length">
            <div
              class="subsense-item flex mt-2px"
              v-for="(subsense, subsenseIndex) in sense.subsenses"
              :key="subsenseIndex"
            >
              <div class="subsense-number pr-2 text-grey-600">
                {{ subsenseIndex + 1 }})
              </div>
              <div class="subsense-item-container flex-col flex-auto items-stretch">
                <!-- definition -->
                <div class="subsense-definition">
                  <!-- label -->
                  <label-set
                    class="subsense-definition-label"
                    size="medium"
                    :label-set="subsense.labelSet"
                  />

                  <span class="split text-0">&nbsp;</span>

                  <fragment
                    class="subsense-frag"
                    :fragment="subsense.definition.fragments"
                  />

                  <!-- etymology -->
                  <etymology :etymology="subsense.etymology" />

                  <div
                    class="subsense-labels inline"
                    v-if="subsense.domainClasses && subsense.domainClasses.length
                      && subsense.semanticClasses && subsense.semanticClasses.length"
                  >
                    <!-- domain class -->
                    <labels
                      v-if="subsense.domainClasses && subsense.domainClasses.length"
                      class="ml-5px"
                      color="lightpink"
                      size="small"
                      :labels="subsense.domainClasses"
                      type="domain"
                    />

                    <!-- semantic class -->
                    <labels
                      v-if="subsense.semanticClasses && subsense.semanticClasses.length"
                      class="ml-5px"
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
<style lang="sass" src="./senseItem.sass" scoped></style>
