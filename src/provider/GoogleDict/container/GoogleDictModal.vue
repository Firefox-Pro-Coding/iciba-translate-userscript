<template>
  <modal-component
    :open="visible"
    @close="handleCloseModal"
  >
    <div class="google-dict-modal flex-col relative shadow-16">
      <div class="fold-control flex absolute select-none z-20 shadow-2 opacity-75 hover:opacity-100 duration-200 ease-in-out bg-bg-5">
        <div
          :class="{ disable: !shrinkable }"
          class="control-btn flex flex-center relative"
          @click="handleShrink"
        >
          <i-icon size="20" :svg="icon.minus" />
          <div class="tooltip">
            less
          </div>
        </div>
        <div class="split border-l border-grey-400" />
        <div
          :class="{ disable: !expandable }"
          class="control-btn flex flex-center"
          @click="handleExpand"
        >
          <i-icon size="20" :svg="icon.plus" />
          <div class="tooltip">
            more
          </div>
        </div>
      </div>

      <div class="modal-box flex-col flex-1 h-0 relative text-14 bg-white">
        <scrollable class="flex-1 h-0">
          <template #default="{ scrollBar }">
            <div
              class="content-box px-5 pt-5 pb-7"
              :class="{
                'pr-5': !scrollBar,
                'pr-7': scrollBar,
              }"
            >
              <div
                class="dictionary-data-box flex-col items-stretch"
                v-if="state.containerData && state.containerData.length"
              >
                <div
                  class="dictionary-data-item"
                  v-for="dicDataItem in state.containerData"
                  :key="state.id + dicDataItem.queryTerm"
                >
                  <!-- entry -->
                  <!-- <div class="entry-box flex-col items-stretch" v-if="false"> -->
                  <div
                    class="entry-box flex-col items-stretch"
                    v-if="dicDataItem.entries && dicDataItem.entries.length"
                  >
                    <entry
                      :class="{
                        'mt-5': entryIndex !== 0,
                      }"
                      v-for="(entry, entryIndex) in dicDataItem.entries"
                      :entry="entry"
                      :key="entry.entrySeqNo"
                    />
                  </div>

                  <!-- usage over time -->
                  <usage-overtime
                    v-if="dicDataItem.usageOverTimeImage"
                    :image="dicDataItem.usageOverTimeImage"
                    :term="dicDataItem.queryTerm"
                  />
                </div>
              </div>

              <!-- {{#hasWebDefinitions}}
              <div class="section-name">Web definitions</div>
              {{#webDefinitions}}
              <div>
                <div>{{definition}}</div>
                <div><a href="{{sourceUrl}}">{{sourceUrl}}</a></div>
              </div>
              {{/webDefinitions}}
              {{/hasWebDefinitions}} -->
            </div>
          </template>
        </scrollable>
      </div>
    </div>
  </modal-component>
</template>

<script lang="ts" src="./GoogleDictModal.ts"></script>
<style lang="sass" src="./GoogleDictModal.sass" scoped></style>
