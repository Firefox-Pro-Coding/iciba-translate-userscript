<template>
  <transition name="modal">
    <div
      class="modal-wrapper flex fixed inset-0 justify-center items-stretch ease-in-out duration-300"
      :style="{ zIndex: state.zIndex }"
      v-if="state.visible"
    >
      <div class="fold-control flex shadow-2 absolute">
        <div
          :class="{ disable: !shrinkable }"
          class="control-btn flex flex-center"
          @click="handleShrink"
        >
          <i-icon size="20" :svg="icon.minus" />
        </div>
        <div class="split" />
        <div
          :class="{ disable: !expandable }"
          class="control-btn flex flex-center"
          @click="handleExpand"
        >
          <i-icon size="20" :svg="icon.plus" />
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
                    class="entry-item"
                    v-for="entry in dicDataItem.entries"
                    :entry="entry"
                    :key="entry.entrySeqNo"
                  />
                </div>

                <!-- usage over time -->
                <div class="usage-overtime flex-col items-stretch" v-if="dicDataItem.usageOverTimeImage">
                  <div class="usage-title text-18">
                    Use over time for
                    <span class="bg-grey-500 text-white px-1">
                      {{ dicDataItem.queryTerm }}
                    </span>
                  </div>
                  <div
                    :style="{
                      height: `${dicDataItem.usageOverTimeImage.tablet.height / 2 }px`,
                      width: `${dicDataItem.usageOverTimeImage.tablet.width / 2 }px`,
                    }"
                    class="usage-img-wrapper"
                  >
                    <image-loader
                      :height="dicDataItem.usageOverTimeImage.tablet.height"
                      :width="dicDataItem.usageOverTimeImage.tablet.width"
                      :url="`https://www.gstatic.com/onebox/dictionary/${dicDataItem.usageOverTimeImage.tablet.url}`"
                    />
                  </div>
                </div>
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
<style lang="less" src="./GoogleDictModal.less" scoped></style>
