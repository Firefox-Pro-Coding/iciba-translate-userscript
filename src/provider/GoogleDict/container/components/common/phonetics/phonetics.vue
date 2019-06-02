<template>
  <!-- phonetics -->
  <div class="phonetics-component-box flex" v-if="phonetics && phonetics.length">
    <div class="phonetics flex">
      {{ `${phonetics.map(v => `/${v.text}/`).join(' ')}` }}
    </div>

    <div
      class="pl-1 play-button flex flex-center"
      v-for="(item, index) in phonetics.filter(v => v.oxfordAudio)"
      :key="index"
      @click="handlePlay(item.oxfordAudio)">
      <i-icon :svg="icon.play_speaker_filled_audio_tool_59284" />
    </div>
  </div>
</template>

<script lang="ts" src="./phonetics.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';

  .phonetics-component-box {
    height: 20px;
    line-height: 20px;
    align-items: center;
    color: @main-level-3;
    font-family: 'Noto Sans', 'Arial', sans-serif;

    .play-button {
      cursor: pointer;
      height: 20px;
      width: 22px;
      opacity: 0.45;

      &:hover {
        opacity: 0.7;
      }

      &:active {
        background-position: center calc(50% + 1px);
        opacity: 1;
      }
    }
  }
</style>
