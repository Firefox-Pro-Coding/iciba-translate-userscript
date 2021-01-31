<template>
  <div class="google-translate-box flex-col relative text-grey-900" v-if="data">
    <Scrollable class="scroll-container">
      <template #default="{ scrollBar }">
        <div
          class="content-box flex-col flex-auto text-14 break-words"
          :class="[
            scrollBar && 'py-10px pl-10px pr-14px',
            !scrollBar && 'p-10px',
          ]"
        >
          <div
            class="language-select-box w-full select-none"
            v-show="state.visible"
          >
            <div class="flex justify-between">
              <div v-show="state.type === 'source'">源语言</div>
              <div v-show="state.type === 'target'">翻译到</div>
              <div
                class="text-center text-grey-600 py-px px-6px cursor-pointer hover:bg-bg-2"
                @click="state.visible = false"
              >
                取消
              </div>
            </div>
            <div class="items-box flex flex-wrap mt-1" v-show="state.visible">
              <div
                v-for="v of languages"
                :class="{
                  'language-item text-center text-grey-600 cursor-pointer': true,
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

          <div class="translate-content mb-2px" v-show="!state.visible">
            <template v-for="(text, index) of translateText" class="row">
              <span v-if="text" :key="index">{{ text }}</span>
              <br v-if="!text" :key="index">
            </template>
          </div>

          <div
            class="google-dict-tip mt-2px mb-3px text-12 text-right text-grey-400"
            v-if="data.fromDict"
          >
            google字典无结果，以上内容来自谷歌翻译
          </div>

          <div class="bottom-info-box flex justify-between" v-show="!state.visible">
            <div class="tts-box flex select-none">
              <div
                class="play-sound flex flex-center cursor-pointer"
                @click="handlePlay('source')"
              >
                源
                <i-icon class="audio-icon" :svg="icon.play_speaker_filled_audio_tool_59284" />
              </div>
              <div
                class="play-sound flex flex-center ml-2 cursor-pointer"
                @click="handlePlay('target')"
              >
                译
                <i-icon class="audio-icon" :svg="icon.play_speaker_filled_audio_tool_59284" />
              </div>
            </div>
            <div class="flex select-none text-grey-400">
              <div
                class="cursor-pointer hover:text-primary"
                @click="showLanguageSelect('source')"
              >
                {{ getLanguage(data.detectedLanguage) }}
                {{ data.sourceLanguage === 'auto' ? '(自动检测)' : '' }}
              </div>
              <div class="px-1"> -&gt; </div>
              <div
                class="cursor-pointer hover:text-primary"
                @click="showLanguageSelect('target')"
              >
                {{ getLanguage(data.targetLanguage) }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </Scrollable>
  </div>
</template>

<script lang="ts" src="./GoogleTranslateContainer.ts"></script>
<style lang="sass" src="./GoogleTranslateContainer.sass" scoped></style>
