<template>
  <div class="ali-api-translate-box flex-col relative text-grey-900">
    <scrollable class="scroll-container">
      <template #default="{ scrollBar }">
        <div
          class="content-box flex-col flex-auto text-14 break-words"
          :class="[
            scrollBar && 'py-10px pl-10px pr-14px',
            !scrollBar && 'p-10px',
          ]"
        >
          <div
            class="language-select-box select-none w-full"
            v-show="state.visible"
          >
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
                  'language-item text-center text-grey-600': true,
                  'active text-grey-800': containerData.autoMode,
                }"
                key="auto"
                @click="handleLanguageSelect('auto')"
              >
                自动检测
              </div>
            </div>
          </div>

          <div class="content mb-2px flex-col" v-show="!state.visible">
            {{ containerData.data.Data.Translated }}
          </div>

          <div class="bottom-info-box flex justify-between" v-show="!state.visible">
            <div class="language-info-box flex">
              <div
                class="language"
                @click="showLanguageSelect('source')"
              >
                {{ containerData.autoMode ? '自动检测' : getLanguage(containerData.sourceLanguage) }}
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
      </template>
    </scrollable>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="sass" src="./index.sass" scoped></style>
