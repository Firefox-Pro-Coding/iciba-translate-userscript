<template>
  <div class="pronunciation-item flex">
    <div
      class="ipa-type-name mr-1 text-12"
      v-if="type"
      :textContent.prop="type"
    />
    <div class="ipa text-12">{{ ipa }}</div>
    <div
      class="play-sound flex flex-center ml-1"
      @click="handlePlay"
    >
      <i-icon :svg="icon.play" />
    </div>
  </div>
</template>

<script lang="ts" src="./pronunciation-item.ts"></script>
<style lang="sass" src="./pronunciation-item.sass" scoped></style>
