<template>
  <div class="google-dict-result-container no-matter-what-this-class-is reset">
    <div class="real-contaner flex-co">
      <div class="scroll-bar-track" ref="scroll-bar-track">
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
        <div class="result-content">
          <div class="dictionary-data-box flex-co" v-if="dictionaryData && dictionaryData.length">
            <div class="dictionary-data-item" v-for="(dicDataItem, index) in dictionaryData" :key="index">

              <!-- entry -->
              <div class="entry-box flex-co" v-if="dicDataItem.entries && dicDataItem.entries.length">
                <div
                  class="entry-item"
                  v-for="(entry, index) in dicDataItem.entries"
                  :key="index">

                  <!-- headword -->
                  <div class="headword">
                    {{ entry.syllabifiedHeadword || entry.headword }}
                  </div>

                  <!-- phonetics -->
                  <div class="phonetics-box flex" v-if="entry.phonetics && entry.phonetics.length">
                    <div class="phonetics flex">
                      <span>/</span>
                      <span v-for="(item, index) in entry.phonetics" :key="index">
                        <span>{{ item.text }}</span>
                        <span
                          style="padding: 0 1px"
                          v-if="index !== entry.phonetics.length - 1">,</span>
                      </span>
                      <span>/</span>
                    </div>

                    <div
                      class="play-button"
                      v-for="(item, index) in entry.phonetics"
                      :key="index"
                      @click="handlePlay(item.oxfordAudio)"
                      v-if="item.oxfordAudio">
                    </div>
                  </div>

                  <!-- sense-family -->
                  <div class="sense-family-box flex-co" v-if="entry.senseFamilies && entry.senseFamilies.length">
                    <div
                      class="sense-family-item flex-co"
                      v-for="(senseFamilyItem, index) in entry.senseFamilies"
                      :key="index">
                      <div class="poss" v-for="(item, index) in senseFamilyItem.partsOfSpeechs" :key="index">
                        <span class="pos">{{ item.value }}</span>
                      </div>

                      <!-- sense-list -->
                      <div class="sense-list flex-co" v-if="senseFamilyItem.senses && senseFamilyItem.senses.length">
                        <div
                          class="sense-item flex"
                          :class="{ collapsable: index !== 0 }"
                          v-if="index < 2"
                          v-for="(sense, index) in senseFamilyItem.senses"
                          :key="index">
                          <div class="number">{{ index + 1 }}.</div>
                          <div class="definition">{{ sense.definition.text }}</div>
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
        <div class="expanded-modal-wrapper" v-if="modalVisible">
          <div class="modal" @click="handleCloseModal">

          </div>
          <div class="expanded-result-content">

            <!-- TODO: Maybe render subentries, e.g. for "pan out". -->
            <div class="dictionary-data-box flex-co" v-if="dictionaryData && dictionaryData.length">
              <div class="dictionary-data-item" v-for="(dicDataItem, index) in dictionaryData" :key="index">

                <!-- entry -->
                <div class="entry-box flex-co" v-if="dicDataItem.entries && dicDataItem.entries.length">
                  <div
                    class="entry-item"
                    v-for="(entry, index) in dicDataItem.entries"
                    :key="index">

                    <!-- headword -->
                    <div class="headword">
                      {{ entry.syllabifiedHeadword || entry.headword }}
                    </div>

                    <!-- phonetics -->
                    <div class="phonetics-box flex" v-if="entry.phonetics && entry.phonetics.length">
                      <span>
                        /
                        <span v-for="(item, index) in entry.phonetics" :key="index">
                          {{ item.text }}
                          <template v-if="index !== entry.phonetics.length - 1">
                            ,
                          </template>
                        </span>
                        /
                      </span>

                      <div
                        class="play-button"
                        v-for="(item, index) in entry.phonetics"
                        :key="index"
                        @click="handlePlay(item.oxfordAudio)"
                        v-if="item.oxfordAudio">
                      </div>
                    </div>

                    <!-- sense-family -->
                    <div class="sense-family-box flex-co" v-if="entry.senseFamilies && entry.senseFamilies.length">
                      <div class="sense-family-item flex-co" v-for="(senseFamilyItem, index) in entry.senseFamilies" :key="index">
                        <div class="poss" v-for="(item, index) in senseFamilyItem.partsOfSpeechs" :key="index">
                          <span class="pos">{{ item.value }}</span>
                        </div>

                        <!-- morph-units -->
                        <div class="morph-units-box" v-if="senseFamilyItem.morphUnits && senseFamilyItem.morphUnits.length">
                          <div class="morph-units-item" v-for="(item, index) in senseFamilyItem.morphUnits" :key="index">
                            <span class="description">{{ item.formType.description }}</span>
                            <span class="word-form">{{ item.wordForm }}</span>
                          </div>
                        </div>

                        <!-- sense-list -->

                        <!-- sense-list -->
                        <div class="sense-list flex-co" v-if="senseFamilyItem.senses && senseFamilyItem.senses.length">
                          <div
                            class="sense-item flex"
                            :class="{ collapsable: index !== 0 }"
                            v-if="index < 2"
                            v-for="(sense, index) in senseFamilyItem.senses"
                            :key="index">
                            <div class="number">{{ index + 1 }}.</div>
                            <div class="definition">{{ sense.definition.text }}</div>

                            <!-- Only show sense syns if there are no subsenses. -->
                            <div class="subsense-box" v-if="sense.subsenses && sense.subsenses.length">
                              <div class="subsense-item" v-for="(subsense, index) in sense.subsenses" :key="index">
                                <!-- {{#thesaurusEntries}} {{#synonyms}} {{#nyms}}
                                <span class="nym"><a class="nym-link" href="#">{{nym}}</a></span>
                                {{/nyms}} {{/synonyms}} {{/thesaurusEntries}} -->
                              </div>
                            </div>

                            <!-- <ul class="subsenses">
                              {{#subsenses}}
                              <li class="subsense">
                                <div class="definition">{{definition.text}}</div>
                              </li>
                              <div class="syns">
                                {{#showOnlyOnce}}
                                {{#thesaurusEntries}} {{#synonyms}} {{#nyms}}
                                <span class="nym"><a class="nym-link" href="#">{{nym}}</a></span>
                                {{/nyms}} {{/synonyms}} {{/thesaurusEntries}}
                                {{/showOnlyOnce}}
                              </div>
                              {{/subsenses}}
                            </ul> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="usage-overtime">

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
