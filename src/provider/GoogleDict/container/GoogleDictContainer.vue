<template>
  <div class="google-dict-result-container no-matter-what-this-class-is reset" :class="{ 'has-scroll-bar': !noScrollBar }">
    <div class="real-container flex-co">
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
          <div class="dictionary-data-box flex-co" v-if="dictionaryData && dictionaryData.length">
            <div class="dictionary-data-item" v-for="(dicDataItem, index) in dictionaryData" :key="index">

              <!-- entry -->
              <div class="entry-box flex-co" v-if="dicDataItem.entries && dicDataItem.entries.length">
                <div
                  class="entry-item flex-co"
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
                  <phonetics @play-audio="handlePlay" class="phonetics-box" :phonetics="entry.phonetics"></phonetics>

                  <!-- sense-family -->
                  <div class="sense-family-box flex-co" v-if="entry.senseFamilies && entry.senseFamilies.length">
                    <div
                      class="sense-family-item flex-co"
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
                      <div class="sense-list flex-co" v-if="senseFamilyItem.senses && senseFamilyItem.senses.length">
                        <div
                          class="sense-item flex"
                          :class="{ collapsable: index !== 0 }"
                          v-if="index < 2"
                          v-for="(sense, index) in senseFamilyItem.senses"
                          :key="index">
                          <div class="sense-item-number">{{ index + 1 }}.</div>
                          <div class="definition-box">
                            <fragment
                              @entry-click="handleEntryLinkClick"
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
            <div class="dictionary-data-box flex-co" v-if="dictionaryData && dictionaryData.length">
              <div class="dictionary-data-item" v-for="(dicDataItem, index) in dictionaryData" :key="index">

                <!-- entry -->
                <div class="entry-box flex-co" v-if="dicDataItem.entries && dicDataItem.entries.length">
                  <div
                    class="entry-item"
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
                    <phonetics @play-audio="handlePlay" class="phonetics-box" :phonetics="entry.phonetics"></phonetics>

                    <!-- labelSet -->
                    <label-set :label-set="entry.labelSet"></label-set>

                    <!-- note -->
                    <div class="note flex-co" v-if="entry.note">
                      <div class="note-type-box flex">
                        <div class="note-type-label iciba-inline-block">{{ entry.note.type }}</div>
                      </div>
                      <div class="note-text iciba-inline" v-html="entry.note.text"></div>
                    </div>

                    <!-- sense-family -->
                    <div class="sense-family-box flex-co" v-if="entry.senseFamilies && entry.senseFamilies.length">
                      <div class="sense-family-item flex-co" v-for="(senseFamilyItem, index) in entry.senseFamilies" :key="index">
                        <div class="poss" v-if="senseFamilyItem.partsOfSpeechs && senseFamilyItem.partsOfSpeechs.length">
                          <div
                            :title="item.qualifier"
                            class="pos flex flex-wrap"
                            v-for="(item, index) in senseFamilyItem.partsOfSpeechs"
                            :key="index">
                            {{ item.value }}
                          </div>
                        </div>

                        <!-- phonetics -->
                        <phonetics @play-audio="handlePlay" class="phonetics-box" :phonetics="senseFamilyItem.phonetics"></phonetics>

                        <!-- labelSet -->
                        <label-set :label-set="senseFamilyItem.labelSet"></label-set>

                        <!-- morph-units -->
                        <div class="morph-units-box" v-if="senseFamilyItem.morphUnits && senseFamilyItem.morphUnits.length">
                          <div class="morph-units-item iciba-inline" :title="item.formType.posTag" v-for="(item, index) in senseFamilyItem.morphUnits" :key="index">
                            <div class="morph-units-description iciba-inline">{{ item.formType.description }}</div>
                            <div class="morph-units-word-form iciba-inline">{{ item.wordForm }}</div>
                          </div>
                        </div>

                        <!-- sense-list -->
                        <div class="sense-list flex-co" v-if="senseFamilyItem.senses && senseFamilyItem.senses.length">
                          <div
                            class="sense-item flex"
                            :class="{ collapsable: index !== 0 }"
                            v-for="(sense, index) in senseFamilyItem.senses"
                            :key="index">
                            <div class="sense-item-number">{{ index + 1 }}.</div>
                            <div class="sense-item-box flex-co">
                              <!-- labelSet -->
                              <label-set :label-set="sense.labelSet"></label-set>

                              <!-- difinition -->
                              <div class="definition-box flex-co">
                                <div class="difinition">

                                  <div class="text iciba-inline">
                                    <div class="iciba-inline sense-definition-frag" v-for="(frag, index) in sense.definition.fragments" :key="index">
                                      <a
                                        v-if="frag.isEntryLink"
                                        class="searchable-word"
                                        @click="handleEntryLinkClick(frag.text)"
                                        v-html="frag.text"></a>
                                      <div class="iciba-inline" v-else v-html="frag.text"></div>
                                    </div>
                                  </div>

                                  <fragment
                                    @entry-click="handleEntryLinkClick"
                                    class="sense-frag"
                                    :fragment="sense.definition.fragments">
                                  </fragment>

                                  <!-- domain class -->
                                  <template v-if="sense.domainClasses && sense.domainClasses.length">
                                    <div
                                      title="domain"
                                      class="sense-label domain-label iciba-inline-block"
                                      v-for="(domain, index) in sense.domainClasses"
                                      :key="`domain-${index}`">
                                      {{ domain }}
                                    </div>
                                  </template>

                                  <!-- semantic class -->
                                  <template v-if="sense.semanticClasses && sense.semanticClasses.length">
                                    <div
                                      title="semantic"
                                      class="sense-label semantic-label iciba-inline-block"
                                      v-for="(semantic, index) in sense.semanticClasses"
                                      :key="`semantic-${index}`">
                                      {{ semantic }}
                                    </div>
                                  </template>
                                </div>


                                <!-- example groups -->
                                <example-groups :example-groups="sense.exampleGroups"></example-groups>

                                <!-- thesaurus -->
                                <thesaurus
                                  @nym-click="handleNymClick"
                                  :thesaurus-entries="sense.thesaurusEntries">
                                </thesaurus>

                                <!-- subsense -->
                                <div
                                  class="subsense-box"
                                  v-if="sense.subsenses && sense.subsenses.length">
                                  <div
                                    class="subsense-item"
                                    v-for="(subsense, index) in sense.subsenses"
                                    :key="index">
                                    <div class="subsense-item-container flex-co">
                                      <!-- label -->
                                      <label-set :label-set="subsense.labelSet"></label-set>

                                      <!-- definition -->
                                      <div class="subsense-definition">
                                        <fragment
                                          @entry-click="handleEntryLinkClick"
                                          class="subsense-frag"
                                          :fragment="subsense.definition.fragments">
                                        </fragment>

                                        <!-- etymology -->
                                        <etymology @entry-click="handleEntryLinkClick" :etymology="subsense.etymology"></etymology>

                                        <!-- domain class -->
                                        <template v-if="subsense.domainClasses && subsense.domainClasses.length">
                                          <div
                                            title="domain"
                                            class="subsense-label domain-label iciba-inline-block"
                                            v-for="(domain, index) in subsense.domainClasses"
                                            :key="`domain-${index}`">
                                            {{ domain }}
                                          </div>
                                        </template>

                                        <!-- semantic class -->
                                        <template v-if="subsense.semanticClasses && subsense.semanticClasses.length">
                                          <div
                                            title="semantic"
                                            class="subsense-label semantic-label iciba-inline-block"
                                            v-for="(semantic, index) in subsense.semanticClasses"
                                            :key="`semantic-${index}`">
                                            {{ semantic }}
                                          </div>
                                        </template>
                                      </div>

                                      <!-- example groups -->
                                      <example-groups :example-groups="subsense.exampleGroups"></example-groups>

                                      <!-- thesaurus -->
                                      <thesaurus
                                        @nym-click="handleNymClick"
                                        :thesaurus-entries="subsense.thesaurusEntries">
                                      </thesaurus>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <!-- etymology -->
                              <etymology @entry-click="handleEntryLinkClick" :etymology="sense.etymology"></etymology>

                              <!-- note -->
                              <!-- here could have note. but do not render at end of sense -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- etymology -->
                    <etymology @entry-click="handleEntryLinkClick" :etymology="entry.etymology"></etymology>
                  </div>
                </div>

                <!-- usage over time -->
                <div class="usage-overtime flex-co" v-if="dicDataItem.usageOverTimeImage">
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
