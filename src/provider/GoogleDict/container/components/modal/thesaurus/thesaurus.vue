<template>
  <!-- thesaurus -->
  <foldable :fold="folded" v-if="t && t.length">
    <div
      class="thesaurus-container flex items-center relative"
      v-if="t.length"
    >
      <div
        class="th-btn px-1 bg-grey-200 text-grey-700 select-none ease-in-out duration-100"
        :class="{ opened: state.visible }"
        @click="handleToggleVisible"
      >
        thesaurus
      </div>

      <transition name="p">
        <div
          class="th-popup flex-col items-start absolute left-0 bottom-0 shadow-4 bg-white ease-in-out duration-100"
          v-click-outside="handleClose"
          v-show="state.visible"
        >
          <div class="tabs flex">
            <div
              class="tab-group"
              :class="{ selected: tGroup.groups.some(v => v === state.current) }"
              v-for="(tGroup, tGroupIndex) of state.groups"
              :key="tGroupIndex"
            >
              <div
                class="tab-group-index px-1 select-none cursor-pointer"
                @click="handleSelectThesaurus(tGroup.groups[0])"
              >
                group {{ tGroupIndex + 1 }}
              </div>
              <div class="tab-group-box flex">
                <div
                  class="tab-item px-1 select-none cursor-pointer"
                  :class="{ selected: state.current === tItem }"
                  v-for="tItem of tGroup.groups"
                  :key="`${tGroupIndex}-${tItem.name}`"
                  @click="handleSelectThesaurus(tItem)"
                >
                  {{ tItem.name }}
                </div>
              </div>
            </div>
          </div>

          <div class="content-box" v-if="state.current">
            <!--  -->
            <template v-if="state.current.type === 't'">
              <div
                class="thesaurus-word-item flex"
                :class="[`${state.type}-item`]"
                v-for="(tItem, tIndex) in state.current.items"
                :key="tIndex"
              >
                <div class="tw-index text-grey mr-1">
                  {{ tIndex + 1 }}.
                </div>
                <div>
                  <labels
                    class="nym-register mr-1"
                    type="register"
                    size="small"
                    v-if="tItem.register"
                    :labels="[tItem.register]"
                  />
                  <div
                    class="nym-item inline-flex text-grey-500"
                    v-for="(nym, nymIndex) in tItem.nyms"
                    :class="{ 'is-core': nym.isCore }"
                    :key="nymIndex"
                  >
                    <div
                      @click="handleNymClick($event, nym)"
                      :class="{ 'entry-link': nym.numEntries }"
                      class="nym-content inline"
                    >
                      {{ nym.nym }}
                    </div>
                    <div
                      v-if="nymIndex !== tItem.nyms.length - 1"
                      class="nym-split inline pr-3px"
                    >
                      ,
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-if="state.current.type === 'e'">
              <div
                class="example-item flex"
                v-for="(example, eIndex) in state.current.items"
                :key="eIndex"
              >
                <div class="example-text mr-1 index text-grey">
                  {{ eIndex + 1 }}.
                </div>
                <div
                  class="example-text flex-auto text-grey"
                  v-html="`${addQoute(example)}`"
                />
              </div>
            </template>
          </div>
        </div>
      </transition>
    </div>
  </foldable>
</template>

<script lang="ts" src="./thesaurus.ts"></script>
<style lang="sass" src="./thesaurus.sass" scoped></style>
