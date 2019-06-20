<template>
  <div class="google-translate-result-container flex-co">
    <scrollable
      :no-scroll-bar-style="{ 'padding-right': '10px' }"
      :scroll-bar-style="{ 'padding-right': '2px' }"
      class="scroll-container">
      <div class="google-translate-result-scroll-container flex-co">
        <div class="language-select-box" v-show="selectLanguage.visible">
          <div class="title-box flex justify-space-between">
            <div v-show="selectLanguage.type === 'source'">源语言</div>
            <div v-show="selectLanguage.type === 'target'">翻译到</div>
            <div class="cancel-button text-center grey--text text--darken-1" @click="selectLanguage.visible = false">取消</div>
          </div>
          <div class="items-box mt-1" v-show="selectLanguage.visible">
            <div
              v-for="v of languages"
              :class="{
                'language-item text-center grey--text text--darken-1': true,
                'active text--darken-3': selectLanguage.type === 'source'
                  ? v.id === containerData.sourceLanguage
                  : v.id === containerData.targetLanguage,
              }"
              :key="v.id"
              @click="handleLanguageSelect(v.id)">
              {{ v.name }}
            </div>
            <div
              v-if="selectLanguage.type === 'source'"
              :class="{
                'language-item text-center grey--text text--darken-1': true,
                'active text--darken-3': containerData.sourceLanguage === 'auto',
              }"
              key="auto"
              @click="handleLanguageSelect('auto')">
              自动检测
            </div>
          </div>
        </div>

        <div class="translate-content flex-co" v-show="!selectLanguage.visible">
          <div class="row" v-for="(row, index) of containerData.data" :key="index">
            {{ row }}
          </div>
        </div>

        <div class="bottom-info-box flex justify-space-between" v-show="!selectLanguage.visible">
          <div class="tts-box flex">
            <div
              class="play-sound flex flex-center"
              @click="handlePlay('source')">
              源
              <i-icon class="audio-icon" :svg="icon.play_speaker_filled_audio_tool_59284" />
            </div>
            <div
              class="play-sound flex flex-center ml-2"
              @click="handlePlay('target')">
              译
              <i-icon class="audio-icon" :svg="icon.play_speaker_filled_audio_tool_59284" />
            </div>
          </div>
          <div class="language-info-box flex">
            <div
              class="language"
              @click="showLanguageSelect('source')">
              {{ getLanguage(containerData.sourceLanguage === 'auto'
                ? containerData.detectedLanguage
                : containerData.sourceLanguage) }}
              {{ containerData.sourceLanguage === 'auto' ? '(自动检测)' : '' }}
            </div>
            <div class="px-1"> -&gt; </div>
            <div
              class="language"
              @click="showLanguageSelect('target')">
              {{ getLanguage(containerData.targetLanguage) }}
            </div>
          </div>
        </div>
      </div>
    </scrollable>
  </div>
</template>

<script lang="ts" src="./SougouTranslateContainer.ts"></script>
<style lang="less" src="./SougouTranslateContainer.less" scoped></style>
