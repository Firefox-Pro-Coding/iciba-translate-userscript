<template>
  <!-- thesaurus -->
  <div
    class="thesaurus-container flex-co"
    v-if="thesaurusEntries && thesaurusEntries.length">
    <div
      class="thesaurus-entry-item flex-co"
      v-for="(thesaurus, index) in thesaurusEntries"
      :key="index">
      <!-- synonyms antonyms -->
      <div
        class="thesaurus-item flex"
        v-for="type in ['synonyms', 'antonyms']"
        :key="type"
        v-if="thesaurus[type] && thesaurus[type].length">
        <div class="title">{{ type }}:</div>
        <div class="thesaurus-word-box flex-co" :class="[`${type}-box`]">
          <div
            class="thesaurus-word-item"
            :class="[`${type}-item`]"
            v-for="(thesaurusItem, index) in thesaurus[type]"
            :key="index">
            <div
              v-if="thesaurusItem.register"
              class="nym-item nym-register-item nym-label iciba-inline">
              {{ thesaurusItem.register }}
            </div>
            <div
              v-for="(nym, index) in thesaurusItem.nyms"
              class="nym-item iciba-inline"
              :class="{ 'has-entry': nym.numEntries, 'is-core': nym.isCore }"
              @click="handleNymClick(nym)"
              :key="index">
              <div class="nym-content iciba-inline">{{ nym.nym }}</div>
              <div
                v-if="index !== thesaurusItem.nyms.length - 1"
                class="nym-split iciba-inline">,</div>
            </div>
          </div>
        </div>

      </div>

      <!-- examples -->
      <div
        class="example-box flex-co"
        v-if="thesaurus.examples && thesaurus.examples.length">
        <div
          class="example-item"
          v-html="`${addQoute(example)}`"
          v-for="(example, index) in thesaurus.examples"
          :key="index">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./thesaurus.ts"></script>
<style lang="less" src="./thesaurus.less" scoped></style>
