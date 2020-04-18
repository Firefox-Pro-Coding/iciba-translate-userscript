<template>
  <!-- thesaurus -->
  <foldable :fold="folded">
    <div class="thesaurus-box flex-col items-start">
      <!-- <div
        class="example-box"
        :key="i"
        v-if="item.examples"
      >
        <div
          class="example-item mt-1px flex"
          v-for="(example, eIndex) in item.examples"
          :key="eIndex"
        >
          <div
            class="example-text flex-auto text-grey-500"
            v-html="`${addQoute(example)}`"
          />
        </div>
      </div> -->

      <template v-for="type of ['synonyms', 'antonyms']">
        <div class="thesaurus-syn-ant" :key="type" v-if="combined[type].length">
          <div>
            <span
              :class="{
                [`type-${type}`]: true,
                'cursor-pointer': !getShowMoreExpanded(combined[type]) && combined[type].length > 1,
              }"
              @click="handleShowMore(combined[type])"
            >
              {{ type }}
              <span
                class="show-more inline cursor-pointer select-none"
                v-if="!getShowMoreExpanded(combined[type]) && combined[type].length > 1"
              >
                [more]
              </span>
            </span>
          </div>
          <div class="thesaurus-box ml-3">
            <ThesaurusRow
              class="mt-1px"
              :index="0"
              :item="combined[type][0]"
            />
            <foldable
              v-if="combined[type].length > 1"
              :fold="!getShowMoreExpanded(combined[type])"
            >
              <ThesaurusRow
                class="mt-1px"
                v-for="(tItem, tIndex) in combined[type].slice(1)"
                :key="tIndex"
                :index="tIndex + 1"
                :item="tItem"
              />
            </foldable>
          </div>
        </div>
      </template>
    </div>
  </foldable>
</template>

<script lang="ts" src="./thesaurus.ts"></script>
<style lang="sass" src="./thesaurus.sass" scoped></style>
