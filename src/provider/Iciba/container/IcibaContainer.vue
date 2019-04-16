<template>
  <div class="iciba-result-container q-flex-co">
    <scroll-bar class="scroll-container">
      <div class="iciba-result-scroll-container q-flex-co">
        <!-- pinyin -->
        <div class="pinyin" v-if="result && result.chinese && result.chinese.ci && result.chinese.ci.pinyin">
          [{{ result.chinese.ci.pinyin }}]
        </div>

        <!-- symbols -->
        <div
          class="symbols-box q-flex-co align-stretch"
          v-if="result && result.baseInfo && result.baseInfo.symbols && result.baseInfo.symbols.length">
          <div class="symbol-item q-flex-co align-stretch" v-for="(symbomItem, index) in result.baseInfo.symbols" :key="index">
            <!-- pronunciation -->
            <div class="pronunciation-box q-flex-co align-stretch">
              <!-- en -->
              <div class="pronunciation-item pron-en q-flex" v-if="symbomItem.ph_en_mp3">
                <div class="ipa-type-name">英</div>
                <div class="ipa" v-if="symbomItem.ph_en">
                  [{{ symbomItem.ph_en }}]
                </div>
                <div class="playSound" @click="handlePlay(symbomItem.ph_en_mp3)"></div>
              </div>
              <!-- am -->
              <div class="pronunciation-item pron-am q-flex" v-if="symbomItem.ph_am_mp3">
                <div class="ipa-type-name">美</div>
                <div class="ipa" v-if="symbomItem.ph_am">
                  [{{ symbomItem.ph_am }}]
                </div>
                <div class="playSound" @click="handlePlay(symbomItem.ph_am_mp3)"></div>
              </div>
              <!-- tts -->
              <div
                class="pronunciation-item pron-other q-flex"
                v-if="symbomItem.ph_tts_mp3 && !symbomItem.ph_en_mp3 && !symbomItem.ph_am_mp3">
                <div class="ipa-type-name">TTS</div>
                <div class="ipa" v-if="symbomItem.ph_other">
                  [{{ symbomItem.ph_other }}]
                </div>
                <div class="playSound" @click="handlePlay(symbomItem.ph_tts_mp3)"></div>
              </div>
            </div>

            <!-- meaning -->
            <div
              class="part-box q-flex-co align-stretch"
              :class="{ 'no-margin-top': !symbomItem.ph_en_mp3 && !symbomItem.ph_am_mp3 && !symbomItem.ph_tts_mp3 }"
              v-if="symbomItem.parts.length">
              <div class="part-item q-flex" v-for="(partItem, partItemIndex) in symbomItem.parts" :key="partItemIndex">
                <div class="part-item-part" v-if="partItem.part">
                  {{ partItem.part }}
                </div>
                <div class="part-item-meaning-box">
                  <div
                    class="meaning-item q-inline"
                    v-for="(meanItem, meanItemIndex) in partItem.means"
                    :key="meanItemIndex">
                    <template v-if="meanItemIndex === partItem.means.length - 1">
                      {{ meanItem }}
                    </template>
                    <template v-else>
                      {{ meanItem }};
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- translation -->
        <div
          class="translation-box q-flex-co align-stretch"
          v-if="result && result.baseInfo && result.baseInfo.translate_type === 2 && result.baseInfo.translate_result">
          <div class="translate-content">
            {{ result.baseInfo.translate_result }}
          </div>
          <div class="translate-tip">
            {{ result.baseInfo.translate_msg }}
          </div>
        </div>

        <!-- suggest -->
        <div
          class="suggest-box q-flex-co align-stretch"
          v-if="result && result.baseInfo && result.baseInfo.translate_type === 3">
          {{ result.baseInfo.suggest.map(v => v.key).join('; ') }}
        </div>
      </div>
    </scroll-bar>
  </div>
</template>

<script lang="ts" src="./IcibaContainer.ts"></script>

<style lang="less" src="./IcibaContainer.less" scoped></style>
