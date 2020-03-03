<template>
  <!-- phonetics -->
  <div
    class="phonetics-box flex items-center text-grey-700"
    v-if="props.phonetics && props.phonetics.length"
  >
    <div class="phonetics flex">
      {{ `${props.phonetics.map(v => `/${v.text}/`).join(' ')}` }}
    </div>

    <div
      class="pl-1 play-button flex flex-center"
      v-for="item in props.phonetics.filter(v => v.oxfordAudio)"
      :key="item.oxfordAudio"
      @click="handlePlay(item.oxfordAudio)"
    >
      <i-icon :svg="icon.play_speaker_filled_audio_tool_59284" />
    </div>
  </div>
</template>

<script lang="ts" src="./phonetics.ts"></script>
<style lang="sass" src="./phonetics.sass" scoped></style>
