<template>
  <div class="r-container flex-col relative text-grey-900">
    <scrollable class="scroll-container">
      <template #default="{ scrollBar }">
        <div
          class="main-box flex-col flex-auto text-14 break-words"
          :class="[
            scrollBar && 'py-10px pl-10px pr-14px',
            !scrollBar && 'p-10px',
          ]"
          v-if="result"
        >
          <template v-if="isBaseInfoBaseInfoNormal(result.baseInfo)">
            <!-- symbols -->
            <div
              class="symbols-box flex-col items-stretch"
              v-if="result.baseInfo && result.baseInfo.symbols && result.baseInfo.symbols.length"
            >
              <div
                class="symbol-item flex-col items-stretch w-full"
                :class="{
                  'mt-6px': index !== 0,
                }"
                v-for="(symbolItem, index) in result.baseInfo.symbols"
                :key="index"
              >
                <!-- pronunciation -->
                <div class="pronunciation-box flex-col flex-none items-stretch">
                  <!-- symbol_mp3 -->
                  <iciba-pronunciation
                    v-if="isSymbolCN(symbolItem) && symbolItem.word_symbol"
                    :ipa="symbolItem.word_symbol"
                    @play="handlePlay(symbolItem.symbol_mp3)"
                  />
                  <template v-if="isSymbolEN(symbolItem)">
                    <!-- en -->
                    <iciba-pronunciation
                      v-if="symbolItem.ph_en_mp3"
                      type="英"
                      :ipa="`[${symbolItem.ph_en}]`"
                      @play="handlePlay(symbolItem.ph_en_mp3)"
                    />
                    <!-- am -->
                    <iciba-pronunciation
                      v-if="symbolItem.ph_am_mp3"
                      type="美"
                      :ipa="`[${symbolItem.ph_am}]`"
                      @play="handlePlay(symbolItem.ph_am_mp3)"
                    />
                    <!-- tts -->
                    <iciba-pronunciation
                      v-if="symbolItem.ph_tts_mp3 && !symbolItem.ph_en_mp3 && !symbolItem.ph_am_mp3"
                      type="TTS"
                      :ipa="`[${symbolItem.ph_other}]`"
                      @play="handlePlay(symbolItem.ph_tts_mp3)"
                    />
                  </template>
                </div>

                <!-- meaning -->
                <div
                  class="part-box flex-col flex-none items-stretch"
                  :class="{
                    'mt-1': symbolItem.symbol_mp3 || symbolItem.word_symbol
                  }"
                  v-if="symbolItem.parts && symbolItem.parts.length"
                >
                  <div
                    class="part-item flex"
                    :class="{
                      'mt-3px': partItemIndex !== 0,
                    }"
                    v-for="(partItem, partItemIndex) in symbolItem.parts"
                    :key="partItemIndex"
                  >
                    <div
                      class="part-item-part pr-6px text-grey-600 flex-none"
                      v-if="partItem.part"
                    >
                      {{ partItem.part }}
                    </div>
                    <div class="part-item-meaning-box flex-auto">
                      <div
                        class="meaning-item inline"
                        :class="{
                          'pr-3px': meanItemIndex !== partItem.means.length - 1,
                        }"
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
                  && result.chinese && result.chinese.zi
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
              v-if="result.chinese && result.chinese.ci && result.chinese.ci.ciyi && result.chinese.ci.ciyi.length"
              class="chinese-ci-box mt-1 leading-normal"
            >
              <div class="ciyi-box">
                <div
                  class="ciyi-item"
                  v-for="(item, ciyiIndex) of normalizeCiyi(result.chinese.ci.ciyi)"
                  :key="ciyiIndex"
                >
                  <span class="type-text text-grey-600 pr-1">
                    {{ ciyiIndex + 1 }}.
                  </span>
                  <template v-if="seperateChineseJieshi(item)[0]">
                    <span class="pr-1 text-grey-500">[{{ seperateChineseJieshi(item)[0] }}]</span>
                  </template>
                  <span>{{ seperateChineseJieshi(item)[1] }}</span>
                </div>
              </div>
            </div>
          </template>

          <!-- translation -->
          <div
            class="translation-box flex-col items-stretch"
            v-if="isBaseInfoTranslate(result.baseInfo)
              && result.baseInfo.translate_type === 2
              && result.baseInfo.translate_result"
          >
            <div class="translate-content">
              {{ result.baseInfo.translate_result }}
            </div>
            <div class="translate-tip mt-1 text-right text-12 text-grey-500">
              {{ result.baseInfo.translate_msg.replace(/。$/, '') }}
            </div>
          </div>

          <!-- suggest -->
          <template v-if="isBaseInfoSuggestion(result.baseInfo) && result.baseInfo.suggest.length">
            do you mean?
            <div
              class="suggest-box flex flex-wrap items-stretch"
              v-if="isBaseInfoSuggestion(result.baseInfo)"
            >
              <span
                v-for="(item, index) of result.baseInfo.suggest"
                class="text-blue-500 mr-1 cursor-pointer"
                @click="handleSuggestionClick(item.key)"
                :key="index"
              >
                {{ item.key }}
              </span>
            </div>
          </template>
        </div>
      </template>
    </scrollable>
  </div>
</template>

<script lang="ts" src="./IcibaContainer.ts"></script>
<style lang="sass" src="./IcibaContainer.sass" scoped></style>
