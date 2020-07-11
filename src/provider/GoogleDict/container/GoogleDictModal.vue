<template>
  <transition name="modal">
    <div
      class="modal-wrapper flex fixed inset-0 justify-center items-stretch ease-in-out duration-300"
      :style="{ zIndex: state.zIndex }"
      v-if="state.visible"
    >
      <div class="fold-control select-none flex shadow-2 absolute">
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

      <div
        class="modal-bg absolute inset-0 ease-in-out duration-300"
        @click="handleCloseModal"
      />

      <div class="modal-box relative mx-auto shadow-16 text-14 bg-white">
        <scrollable
          class="scroll-container"
          :no-scroll-bar-style="{ 'padding-right': '10px' }"
          :scroll-bar-style="{ 'padding-right': '2px' }"
        >
          <div class="content-box">
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
        </scrollable>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./GoogleDictModal.ts"></script>
<style lang="sass" src="./GoogleDictModal.sass" scoped></style>
