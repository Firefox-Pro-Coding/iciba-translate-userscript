<template>
  <transition name="modal">
    <div class="google-dict-modal-wrapper flex" :style="{ zIndex: zIndex }" v-if="modalVisible">
      <div class="google-dict-modal-bg" @click="handleCloseModal"></div>
      <div class="google-dict-modal-content google-content-box">
        <div class="dictionary-data-box flex-co flex-stretch" v-if="dictionaryData && dictionaryData.length">
          <div class="dictionary-data-item" v-for="(dicDataItem, index) in dictionaryData" :key="index">

            <!-- entry -->
            <!-- <div class="entry-box flex-co flex-stretch" v-if="false"> -->
            <div class="entry-box flex-co flex-stretch" v-if="dicDataItem.entries && dicDataItem.entries.length">
              <entry
                class="entry-item"
                v-for="(entry, index) in dicDataItem.entries"
                :entry="entry"
                :key="index">
              </entry>
            </div>

            <!-- usage over time -->
            <div class="usage-overtime flex-co flex-stretch" v-if="dicDataItem.usageOverTimeImage">
              <div class="title">
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
