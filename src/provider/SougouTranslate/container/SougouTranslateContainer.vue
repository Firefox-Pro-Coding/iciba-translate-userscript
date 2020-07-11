<template>
  <div class="sougou-translate-box flex-col relative break-words text-grey-900">
    <scrollable class="scroll-container">
      <template #default="{ scrollBar }">
        <div
          class="content-box flex-col flex-auto text-14"
          :class="[
            scrollBar && 'py-10px pl-10px pr-14px',
            !scrollBar && 'p-10px',
          ]"
        >
          <div class="language-select-box w-full" v-show="state.visible">
            <div class="title-box flex justify-between">
              <div v-show="state.type === 'source'">源语言</div>
              <div v-show="state.type === 'target'">翻译到</div>
              <div
                class="cancel-button text-center text-grey-600"
                @click="state.visible = false"
              >
                取消
              </div>
            </div>
            <div class="items-box flex flex-wrap mt-1" v-show="state.visible">
              <div
                v-for="v of languages"
                :class="{
                  'language-item text-center text-grey-600': true,
                  'active text-grey-800': state.type === 'source'
                    ? v.id === data.sourceLanguage
                    : v.id === data.targetLanguage,
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
                  'active text-grey-800': data.sourceLanguage === 'auto',
                }"
                key="auto"
                @click="handleLanguageSelect('auto')"
              >
                自动检测
              </div>
            </div>
          </div>

          <div class="translate-content mb-2px flex-col" v-show="!state.visible">
            <div class="row" v-for="(row, index) of data.data" :key="index">
              {{ row }}
            </div>
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
                {{ getLanguage(data.sourceLanguage === 'auto'
                  ? data.detectedLanguage
                  : data.sourceLanguage) }}
                {{ data.sourceLanguage === 'auto' ? '(自动检测)' : '' }}
              </div>
              <div class="px-1"> -&gt; </div>
              <div
                class="language"
                @click="showLanguageSelect('target')"
              >
                {{ getLanguage(data.targetLanguage) }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </scrollable>
  </div>
</template>

<script lang="ts" src="./SougouTranslateContainer.ts"></script>
<style lang="sass" src="./SougouTranslateContainer.sass" scoped></style>
