<template>
  <div class="baidu-translate-container flex-co">
    <scrollable
      :no-scroll-bar-style="{ 'padding-right': '10px' }"
      :scroll-bar-style="{ 'padding-right': '2px' }"
      class="scroll-container"
    >
      <div class="baidu-translate-result-scroll-container flex-co">
        <div class="language-select-box" v-show="state.visible">
          <div class="title-box flex justify-space-between">
            <div v-show="state.type === 'source'">源语言</div>
            <div v-show="state.type === 'target'">翻译到</div>
            <div class="cancel-button text-center grey--text text--darken-1" @click="state.visible = false">取消</div>
          </div>
          <div class="items-box mt-1" v-show="state.visible">
            <div
              v-for="v of languages"
              :class="{
                'language-item text-center grey--text text--darken-1': true,
                'active text--darken-3': state.type === 'source'
                  ? v.id === containerData.sourceLanguage && !containerData.autoMode
                  : v.id === containerData.targetLanguage,
              }"
              :key="v.id"
              @click="handleLanguageSelect(v.id)"
            >
              {{ v.name }}
            </div>
            <div
              v-if="state.type === 'source'"
              :class="{
                'language-item text-center grey--text text--darken-1': true,
                'active text--darken-3': containerData.autoMode,
              }"
              key="auto"
              @click="handleLanguageSelect('auto')"
            >
              自动检测
            </div>
          </div>
        </div>

        <div class="translate-content flex-co" v-show="!state.visible">
          <div class="row" v-for="row of containerData.data" :key="row">
            {{ row }}
          </div>
        </div>

        <div class="bottom-info-box flex justify-space-between" v-show="!state.visible">
          <div class="tts-box flex">
            <div
              class="play-sound flex flex-center"
              @click="handlePlay('source')"
            >
              源
              <i-icon class="audio-icon" :svg="icon.play_speaker_filled_audio_tool_59284" />
            </div>
            <div
              class="play-sound flex flex-center ml-2"
              @click="handlePlay('target')"
            >
              译
              <i-icon class="audio-icon" :svg="icon.play_speaker_filled_audio_tool_59284" />
            </div>
          </div>
          <div class="language-info-box flex">
            <div
              class="language"
              @click="showLanguageSelect('source')"
            >
              {{ getLanguage(containerData.sourceLanguage) }}
              {{ containerData.autoMode ? '(自动检测)' : '' }}
            </div>
            <div class="px-1"> -&gt; </div>
            <div
              class="language"
              @click="showLanguageSelect('target')"
            >
              {{ getLanguage(containerData.targetLanguage) }}
            </div>
          </div>
        </div>
      </div>
    </scrollable>
  </div>
</template>

<script lang="ts" src="./BaiduTranslateContainer.ts"></script>
<style lang="less" src="./BaiduTranslateContainer.less" scoped></style>
