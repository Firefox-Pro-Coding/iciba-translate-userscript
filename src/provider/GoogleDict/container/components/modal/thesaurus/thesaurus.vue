<template>
  <!-- thesaurus -->
  <foldable :fold="store.googleDict.thesaurusFolded" v-if="thesaurusEntries && thesaurusEntries.length">
    <div class="thesaurus-container flex-co align-stretch">
      <div
        class="thesaurus-entry-item flex-co align-stretch"
        v-for="(thesaurus, thesaurusIndex) in thesaurusEntries"
        :key="thesaurusIndex">
        <!-- synonyms antonyms -->
        <template v-for="type in ['synonyms', 'antonyms']">
          <template v-if="thesaurus[type] && thesaurus[type].length">
            <div
              class="thesaurus-item flex"
              :key="type">
              <div class="thesaurus-item-title">{{ type }}:</div>
              <div class="thesaurus-word-box flex-co align-stretch" :class="[`${type}-box`]">
                <div
                  class="thesaurus-word-item"
                  :class="[`${type}-item`]"
                  v-for="(thesaurusItem, thesaurusItemIndex) in thesaurus[type]"
                  :key="thesaurusItemIndex">
                  <labels
                    class="nym-register"
                    type="register"
                    v-if="thesaurusItem.register"
                    :labels="[thesaurusItem.register]">
                  </labels>
                  <div
                    class="nym-item inline-flex"
                    v-for="(nym, nymIndex) in thesaurusItem.nyms"
                    :class="{ 'is-core': nym.isCore }"
                    :key="nymIndex">
                    <div
                      @click="handleNymClick($event, nym)"
                      :class="{ 'entry-link': nym.numEntries }"
                      class="nym-content q-inline">
                      {{ nym.nym }}
                    </div>
                    <div
                      v-if="nymIndex !== thesaurusItem.nyms.length - 1"
                      class="nym-split q-inline">
                      ,
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>

        <!-- examples -->
        <div
          class="example-box flex-co align-stretch"
          v-if="thesaurus.examples && thesaurus.examples.length">
          <div
            class="example-item flex"
            v-for="(example, index) in thesaurus.examples"
            :key="index">
            <div class="example-padding-text">
              <!-- this text is invisible for placeholder only -->
              synonyms:
            </div>
            <div class="example-text" v-html="`${addQoute(example)}`"></div>
          </div>
        </div>
      </div>
    </div>
  </foldable>
</template>

<script lang="ts" src="./thesaurus.ts"></script>
<style lang="less" src="./thesaurus.less" scoped></style>
