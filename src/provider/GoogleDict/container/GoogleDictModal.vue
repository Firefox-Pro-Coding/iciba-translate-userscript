<template>
  <transition name="modal">
    <div class="google-dict-modal-wrapper q-flex" :style="{ zIndex: zIndex }" v-if="modalVisible">
      <div class="fold-control q-flex elevation-2">
        <div :class="{ disable: !shrinkable }" class="button shrink" @click="handleShrink"></div>
        <div class="split"></div>
        <div :class="{ disable: !expandable }" class="button expand" @click="handleExpand"></div>
      </div>
      <div class="google-dict-modal-bg" @click="handleCloseModal"></div>
      <div class="google-dict-modal-content google-content-box elevation-16">
        <div class="dictionary-data-box q-flex-co align-stretch" v-if="dictionaryData && dictionaryData.length">
          <div class="dictionary-data-item" v-for="(dicDataItem, dicDataItemIndex) in dictionaryData" :key="dicDataItemIndex">
            <!-- entry -->
            <!-- <div class="entry-box q-flex-co align-stretch" v-if="false"> -->
            <div class="entry-box q-flex-co align-stretch" v-if="dicDataItem.entries && dicDataItem.entries.length">
              <entry
                class="entry-item"
                v-for="(entry, entryIndex) in dicDataItem.entries"
                :entry="entry"
                :key="entryIndex">
              </entry>
            </div>

            <!-- usage over time -->
            <div class="usage-overtime q-flex-co align-stretch" v-if="dicDataItem.usageOverTimeImage">
              <div class="usage-title">
                Use over time for: {{ dicDataItem.queryTerm }}
              </div>
              <div
                :style="{
                  height: `${dicDataItem.usageOverTimeImage.tablet.height / 2 }px`,
                  width: `${dicDataItem.usageOverTimeImage.tablet.width / 2 }px`,
                  overflow: 'hidden',
                }"
                class="usage-img-wrapper">
                <image-loader
                  :height="dicDataItem.usageOverTimeImage.tablet.height"
                  :width="dicDataItem.usageOverTimeImage.tablet.width"
                  :url="`https://www.gstatic.com/onebox/dictionary/${dicDataItem.usageOverTimeImage.tablet.url}`">
                </image-loader>
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
    </div>
  </transition>
</template>

<script lang="ts" src="./GoogleDictModal.ts"></script>
<style lang="less" src="./GoogleDictModal.less" scoped></style>
