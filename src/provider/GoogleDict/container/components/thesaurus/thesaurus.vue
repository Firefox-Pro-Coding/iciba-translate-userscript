<template>
  <!-- thesaurus -->
  <div
    class="thesaurus-box flex"
    v-if="thesaurusEntries && thesaurusEntries.length">
    <div class="title">
      synonyms:
    </div>
    <div class="thesaurus-item-box flex-co">
      <div
        class="thesaurus-item flex"
        v-for="(thesaurus, index) in thesaurusEntries"
        :key="index">
        <div class="content flex-co">
          <div
            class="synonyms-box flex-co"
            v-if="thesaurus.synonyms && thesaurus.synonyms.length">
            <div
              class="synonyms-item"
              v-for="(synonyms, index) in thesaurus.synonyms"
              :key="index">
              <span
                v-if="synonyms.register"
                class="nym-item nym-register-item">
                {{ synonyms.register }}
              </span>
              <span
                v-for="(nym, index) in synonyms.nyms"
                class="nym-item"
                :class="{ 'has-entry': nym.numEntries }"
                @click="handleNymClick(nym)"
                :key="index">
                <span class="nym-content">{{ nym.nym }}</span>
                <span
                  v-if="index !== synonyms.nyms.length - 1"
                  class="nym-split">,</span>
              </span>
            </div>
          </div>
          <div
            class="example-box flex-co"
            v-if="thesaurus.examples && thesaurus.examples.length">
            <div
              class="example-item"
              v-html="`${example}`"
              v-for="(example, index) in thesaurus.examples"
              :key="index">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./thesaurus.ts">
</script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';
  @import '~assets/styles/hardreset.less';

  .thesaurus-box {
    .title {
      color: @main-level-4;
      flex: 0 0 auto;
    }

    .thesaurus-item-box {
      flex: 1 1 auto;

      .thesaurus-item {
        & + .thesaurus-item {
          margin: 2px 0 0 0;
        }

        .content {
          flex: 1 1 auto;
          display: list-item;
          margin-left: 20px;
        }

        .synonyms-box {
          .synonyms-item {
            .nym-item {
              display: inline-flex;
              color: @main-level-4;

              &.nym-register-item {
                font-size: 12px;
                background: @background-level-5;
                color: @main-level-5;
                padding: 1px 4px;
                margin: 0 3px 0 0;
              }

              .nym-split {
                padding-right: 3px;
              }

              &.has-entry .nym-content {
                color: @primary;
              }
            }
          }
        }

        .example-box {
          .example-item {
            color: @main-level-4;
          }
        }
      }
    }
  }
</style>
