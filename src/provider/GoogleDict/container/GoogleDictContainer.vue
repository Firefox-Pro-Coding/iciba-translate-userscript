<template lang="icibahtml">
  <div
    class="google-dict-result-container no-matter-what-this-class-is reset"
    :class="{ 'has-scroll-bar': !noScrollBar }">
    <div class="real-container flex-co flex-stretch">
      <div
        :class="{ moving: drag.start }"
        class="scroll-bar-track"
        v-if="!noScrollBar"
        ref="scroll-bar-track">
        <div
          class="scroll-bar-thumb"
          ref="scroll-bar-thumb"
          @mousewheel.prevent
          @mousedown="handleScrollbarThumbClick"
          :style="scrollbarStyle.thumb">
        </div>
      </div>
      <div class="scroll-content" :style="{ 'margin-right': `${-scrollbarWidth}px` }" ref="container">
        <div class="expand-button" title="展开" @click="handleOpenModal"></div>
        <!-- simple result -->
        <div class="content-box">
          <div class="dictionary-data-box flex-co flex-stretch" v-if="dictionaryData && dictionaryData.length">
            <div class="dictionary-data-item" v-for="(dicDataItem, index) in dictionaryData" :key="index">

              <!-- entry -->
              <div class="entry-box flex-co flex-stretch" v-if="dicDataItem.entries && dicDataItem.entries.length">
                <simple-entry
                  class="entry-item"
                  :entry="entry"
                  v-for="(entry, index) in dicDataItem.entries"
                  :key="index">
                </simple-entry>
              </div>

              <!-- <div class="entry-box flex-co flex-stretch" v-if="dicDataItem.entries && dicDataItem.entries.length"> -->
              <div class="entry-box flex-co flex-stretch" v-if="false">
                <div
                  class="entry-item flex-co flex-stretch"
                  v-for="(entry, index) in dicDataItem.entries"
                  :key="index">

                  <!-- headword -->
                  <div class="headword flex flex-wrap">
                    <div class="headword-word">
                      {{ entry.syllabifiedHeadword || entry.headword }}
                    </div>
                    <div class="headword-graph-index" v-if="entry.homographIndex">{{ entry.homographIndex }}</div>
                  </div>

                  <!-- phonetics -->
                  <phonetics class="phonetics-box" :phonetics="entry.phonetics"></phonetics>

                  <!-- sense-family -->
                  <div class="sense-family-box flex-co flex-stretch" v-if="entry.senseFamilies && entry.senseFamilies.length">
                    <div
                      class="sense-family-item flex-co flex-stretch"
                      v-for="(senseFamilyItem, index) in entry.senseFamilies"
                      :key="index">
                      <div
                        :title="item.qualifier"
                        class="poss flex flex-wrap"
                        v-for="(item, index) in senseFamilyItem.partsOfSpeechs"
                        :key="index">
                        {{ item.value }}
                      </div>

                      <!-- sense-list -->
                      <div class="sense-list flex-co flex-stretch" v-if="senseFamilyItem.senses && senseFamilyItem.senses.length">
                        <div
                          class="sense-item flex"
                          :class="{ collapsable: index !== 0 }"
                          v-if="index < 2"
                          v-for="(sense, index) in senseFamilyItem.senses"
                          :key="index">
                          <div class="sense-item-number">{{ index + 1 }}.</div>
                          <div class="definition-box">
                            <fragment
                              class="sense-frag"
                              :fragment="sense.definition.fragments">
                            </fragment>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <transition name="modal">
        <div class="google-dict-modal-wrapper" v-if="modalVisible">
          <div class="google-dict-modal-bg" @click="handleCloseModal">

          </div>
          <div class="google-dict-modal-content content-box">

            <!-- TODO: Maybe render subentries, e.g. for "pan out". -->
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
    </div>
  </div>
</template>

<script lang="ts" src="./GoogleDictContainer.ts"></script>
<style lang="less" src="./GoogleDictContainer.less" scoped></style>
