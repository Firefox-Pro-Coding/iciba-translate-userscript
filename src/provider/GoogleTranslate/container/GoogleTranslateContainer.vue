<template>
  <div class="google-translate-box flex-col relative">
    <Scrollable
      class="scroll-container"
      :no-scroll-bar-style="{ 'padding-right': '10px' }"
      :scroll-bar-style="{ 'padding-right': '2px' }"
    >
      <div class="content-box flex-col flex-auto text-14 break-words">
        <div class="language-select-box w-full" v-show="state.visible">
          <div class="title-box flex justify-between">
            <div v-show="state.type === 'source'">源语言</div>
            <div v-show="state.type === 'target'">翻译到</div>
            <div class="cancel-button text-center text-grey-600" @click="state.visible = false">取消</div>
          </div>
          <div class="items-box flex flex-wrap mt-1" v-show="state.visible">
            <div
              v-for="v of languages"
              :class="{
                'language-item text-center text-grey-600': true,
                'active text-grey-800': state.type === 'source'
                  ? v.id === containerData.sourceLanguage
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
                'language-item text-center text-grey-600': true,
                'active text-grey-800': containerData.sourceLanguage === 'auto',
              }"
              key="auto"
              @click="handleLanguageSelect('auto')"
            >
              自动检测
            </div>
          </div>
        </div>

        <div class="translate-content mb-2px" v-show="!state.visible">
          <template v-for="(text, index) of containerData.data" class="row">
            <span v-if="text" :key="index">{{ text }}</span>
            <br v-if="!text" :key="index">
          </template>
        </div>

        <div
          class="google-dict-tip mt-2px mb-3px text-12 text-right text-grey"
          v-if="containerData.fromDict"
        >
          google字典无结果，以上内容来自谷歌翻译
        </div>

        <div class="bottom-info-box flex justify-between" v-show="!state.visible">
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
              {{ getLanguage(containerData.detectedLanguage) }}
              {{ containerData.sourceLanguage === 'auto' ? '(自动检测)' : '' }}
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
    </Scrollable>
  </div>
</template>


<script lang="ts" src="./GoogleTranslateContainer.ts"></script>
<style lang="less" src="./GoogleTranslateContainer.less" scoped></style>
