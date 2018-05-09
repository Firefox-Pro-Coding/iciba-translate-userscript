<template lang="icibahtml">
  <div class="iciba-result-container no-matter-what-this-class-is reset">
    <!-- symbols -->
    <div
      class="symbols-box flex-co flex-stretch"
      v-if="data.baseInfo && data.baseInfo.symbols && data.baseInfo.symbols.length">
      <div class="symbol-item flex-co flex-stretch" v-for="(symbomItem, index) in data.baseInfo.symbols" :key="index">
        <!-- pronunciation -->
        <div class="pronunciation-box flex-co flex-stretch">
          <!-- en -->
          <div class="pronunciation-item pron-en flex" v-if="symbomItem.ph_en_mp3">
            <div class="ipa-type-name">英</div>
            <div class="ipa" v-if="symbomItem.ph_en">
              [{{ symbomItem.ph_en }}]
            </div>
            <div class="playSound" @click="handlePlay(symbomItem.ph_en_mp3)"></div>
          </div>
          <!-- am -->
          <div class="pronunciation-item pron-am flex" v-if="symbomItem.ph_am_mp3">
            <div class="ipa-type-name">美</div>
            <div class="ipa" v-if="symbomItem.ph_am">
              [{{ symbomItem.ph_am }}]
            </div>
            <div class="playSound" @click="handlePlay(symbomItem.ph_am_mp3)"></div>
          </div>
          <!-- tts -->
          <div
            class="pronunciation-item pron-other flex"
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
          class="part-box flex-co flex-stretch"
          :class="{ 'no-margin-top': !symbomItem.ph_en_mp3 && !symbomItem.ph_am_mp3 && !symbomItem.ph_tts_mp3 }"
          v-if="symbomItem.parts.length">
          <div class="part-item flex" v-for="(partItem, index) in symbomItem.parts" :key="index">
            <div class="part-item-part" v-if="partItem.part">
              {{ partItem.part }}
            </div>
            <div class="part-item-meaning-box">
              <div class="meaning-item iciba-inline" v-for="(meanItem, index) in partItem.means" :key="index">
                <template v-if="index === partItem.means.length - 1">
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
    <div class="translation-box flex-co flex-stretch" v-if="data.baseInfo && data.baseInfo.translate_type === 2 && data.baseInfo.translate_result">
      <div class="translate-content">
        {{ data.baseInfo.translate_result }}
      </div>
      <div class="translate-tip">
        {{ data.baseInfo.translate_msg }}
      </div>
    </div>

    <!-- suggest -->
    <div class="suggest-box flex-co flex-stretch" v-if="data.baseInfo && data.baseInfo.translate_type === 3">
      {{ data.baseInfo.suggest.map(v => v.key).join('; ') }}
    </div>
  </div>
</template>

<script lang="ts" src="./IcibaContainer.ts"></script>

<style lang="less" src="./IcibaContainer.less" scoped></style>
