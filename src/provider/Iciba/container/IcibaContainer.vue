<template>
  <div class="iciba-result-container flex-co">
    <scrollable class="scroll-container">
      <div class="iciba-result-scroll-container flex-co">
        <!-- pinyin -->
        <div class="pinyin" v-if="result && result.chinese && result.chinese.ci && result.chinese.ci.pinyin">
          [{{ result.chinese.ci.pinyin }}]
        </div>

        <!-- symbols -->
        <div
          class="symbols-box flex-co align-stretch"
          v-if="result && result.baseInfo && result.baseInfo.symbols && result.baseInfo.symbols.length">
          <div class="symbol-item flex-co align-stretch" v-for="(symbomItem, index) in result.baseInfo.symbols" :key="index">
            <!-- pronunciation -->
            <div class="pronunciation-box flex-co align-stretch">
              <!-- en -->
              <div class="pronunciation-item pron-en flex" v-if="symbomItem.ph_en_mp3">
                <div class="ipa-type-name">英</div>
                <div class="ipa" v-if="symbomItem.ph_en">
                  [{{ symbomItem.ph_en }}]
                </div>
                <div class="play-sound flex flex-center" @click="handlePlay(symbomItem.ph_en_mp3)">
                  <i-icon :svg="icon.play_speaker_filled_audio_tool_59284" />
                </div>
              </div>
              <!-- am -->
              <div class="pronunciation-item pron-am flex" v-if="symbomItem.ph_am_mp3">
                <div class="ipa-type-name">美</div>
                <div class="ipa" v-if="symbomItem.ph_am">
                  [{{ symbomItem.ph_am }}]
                </div>
                <div class="play-sound flex flex-center" @click="handlePlay(symbomItem.ph_am_mp3)">
                  <i-icon :svg="icon.play_speaker_filled_audio_tool_59284" />
                </div>
              </div>
              <!-- tts -->
              <div
                class="pronunciation-item pron-other flex"
                v-if="symbomItem.ph_tts_mp3 && !symbomItem.ph_en_mp3 && !symbomItem.ph_am_mp3">
                <div class="ipa-type-name">TTS</div>
                <div class="ipa" v-if="symbomItem.ph_other">
                  [{{ symbomItem.ph_other }}]
                </div>
                <div class="play-sound flex flex-center" @click="handlePlay(symbomItem.ph_tts_mp3)">
                  <i-icon :svg="icon.play_speaker_filled_audio_tool_59284" />
                </div>
              </div>
            </div>

            <!-- meaning -->
            <div
              class="part-box flex-co align-stretch"
              :class="{ 'no-margin-top': !symbomItem.ph_en_mp3 && !symbomItem.ph_am_mp3 && !symbomItem.ph_tts_mp3 }"
              v-if="symbomItem.parts.length">
              <div class="part-item flex" v-for="(partItem, partItemIndex) in symbomItem.parts" :key="partItemIndex">
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
          class="translation-box flex-co align-stretch"
          v-if="result && result.baseInfo && result.baseInfo.translate_type === 2 && result.baseInfo.translate_result">
          <div class="translate-content">
            {{ result.baseInfo.translate_result }}
          </div>
          <div class="translate-tip">
            {{ result.baseInfo.translate_msg.replace(/。$/, '') }}
          </div>
        </div>

        <!-- suggest -->
        <div
          class="suggest-box flex-co align-stretch"
          v-if="result && result.baseInfo && result.baseInfo.translate_type === 3">
          {{ result.baseInfo.suggest.map(v => v.key).join('; ') }}
        </div>
      </div>
    </scrollable>
  </div>
</template>

<script lang="ts" src="./IcibaContainer.ts"></script>

<style lang="less" src="./IcibaContainer.less" scoped></style>
