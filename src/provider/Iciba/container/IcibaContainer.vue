<template>
  <div class="r-container flex-co">
    <scrollable
      class="scroll-container"
      :no-scroll-bar-style="{ 'padding-right': '10px' }"
      :scroll-bar-style="{ 'padding-right': '2px' }"
    >
      <div class="main-box flex-co" v-if="result">
        <template v-if="isBaseInfoBaseInfoNormal(result.baseInfo)">
          <!-- symbols -->
          <div
            class="symbols-box flex-co align-stretch"
            v-if="result.baseInfo && result.baseInfo.symbols && result.baseInfo.symbols.length"
          >
            <div
              class="symbol-item flex-co align-stretch"
              v-for="(symbomItem, index) in result.baseInfo.symbols"
              :key="index"
            >
              <!-- pronunciation -->
              <div class="pronunciation-box flex-co align-stretch">
                <!-- symbol_mp3 -->
                <div v-if="isSymbolCN(symbomItem)" class="pronunciation-item pron-en flex">
                  <div class="ipa" v-if="symbomItem.word_symbol">
                    {{ symbomItem.word_symbol }}
                  </div>
                  <div class="play-sound flex flex-center" v-if="symbomItem.symbol_mp3" @click="handlePlay(symbomItem.symbol_mp3)">
                    <i-icon :svg="icon.play_speaker_filled_audio_tool_59284" />
                  </div>
                </div>
                <template v-if="isSymbolEN(symbomItem)">
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
                    <div class="play-sound flex flex-center" v-if="symbomItem.ph_am_mp3" @click="handlePlay(symbomItem.ph_am_mp3)">
                      <i-icon :svg="icon.play_speaker_filled_audio_tool_59284" />
                    </div>
                  </div>
                  <!-- tts -->
                  <div
                    class="pronunciation-item pron-other flex"
                    v-if="symbomItem.ph_tts_mp3 && !symbomItem.ph_en_mp3 && !symbomItem.ph_am_mp3"
                  >
                    <div class="ipa-type-name">TTS</div>
                    <div class="ipa" v-if="symbomItem.ph_other">
                      [{{ symbomItem.ph_other }}]
                    </div>
                    <div class="play-sound flex flex-center" @click="handlePlay(symbomItem.ph_tts_mp3)">
                      <i-icon :svg="icon.play_speaker_filled_audio_tool_59284" />
                    </div>
                  </div>
                </template>
              </div>

              <!-- meaning -->
              <div
                class="part-box mt-1 flex-co align-stretch"
                v-if="symbomItem.parts && symbomItem.parts.length"
              >
                <div class="part-item flex" v-for="(partItem, partItemIndex) in symbomItem.parts" :key="partItemIndex">
                  <div class="part-item-part" v-if="partItem.part">
                    {{ partItem.part }}
                  </div>
                  <div class="part-item-meaning-box">
                    <div
                      class="meaning-item q-inline"
                      v-for="(meanItem, meanItemIndex) in partItem.means"
                      :key="meanItemIndex"
                    >
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

          <!-- chinese zi -->
          <!-- 当无baseInfo时才显示 -->
          <div
            v-if="
              (!result.baseInfo || !result.baseInfo.symbols || !result.baseInfo.symbols.length)
                && isCodec2(result) && result.chinese && result.chinese.zi
            "
            class="chinese-zi-box mt-1"
          >
            <div
              class="zi-item"
              v-for="(ziItem, ziIndex) of result.chinese.zi"
              :key="ziIndex"
            >
              {{ ziItem.hanzi }}
              {{ ziItem.pinyin }}
              {{ ziItem.jieshi }}
            </div>
          </div>

          <!-- chinese ci -->
          <div
            v-if="isCodec2(result) && result.chinese && result.chinese.ci && result.chinese.ci.ciyi && result.chinese.ci.ciyi.length"
            class="chinese-ci-box mt-1"
          >
            <div class="ciyi-box">
              <div
                class="ciyi-item"
                v-for="(item, ciyiIndex) of normalizeCiyi(result.chinese.ci.ciyi)"
                :key="ciyiIndex"
              >
                <span class="type-text pr-1">
                  {{ ciyiIndex + 1 }}.
                </span>
                <template v-if="seperateChineseJieshi(item)[0]">
                  <span class="pr-1 grey--text">[{{ seperateChineseJieshi(item)[0] }}]</span>
                </template>
                <span>{{ seperateChineseJieshi(item)[1] }}</span>
              </div>
            </div>
          </div>
        </template>

        <!-- translation -->
        <div
          class="translation-box flex-co align-stretch"
          v-if="isBaseInfoTranslate(result.baseInfo)
            && result.baseInfo.translate_type === 2
            && result.baseInfo.translate_result"
        >
          <div class="translate-content">
            {{ result.baseInfo.translate_result }}
          </div>
          <div class="translate-tip">
            {{ result.baseInfo.translate_msg.replace(/。$/, '') }}
          </div>
        </div>

        <!-- suggest -->
        <!-- <div
          class="suggest-box flex-co align-stretch"
          v-if="isBaseInfoTranslate(result.baseInfo) && result.baseInfo.translate_type === 3"
        >
          {{ result.baseInfo.suggest.map(v => v.key).join('; ') }}
        </div> -->
      </div>
    </scrollable>
  </div>
</template>

<script lang="ts" src="./IcibaContainer.ts"></script>
<style lang="less" src="./IcibaContainer.less" scoped></style>
