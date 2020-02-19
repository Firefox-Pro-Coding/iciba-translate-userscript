<template>
  <div
    class="label-box inline text-0"
    :class="[colorClass, sizeClass]"
    v-if="labels && labels.length"
  >
    <!--
      prevent purgecss
      size-small
      size-medium
      size-large
      color-main
      color-plain
      color-light
      color-lightpink
      color-lightblue
      color-geographics
      color-registers
      color-subjects
     -->
    <template v-for="(label, index) in props.labels">
      <div
        class="label relative inline-flex"
        :class="[
          labelClass,
          index === labels.length - 1 ? 'last' : '',
        ]"
        @mouseover="shopTip(label)"
        @mouseleave="hideTip(label)"
        :key="index"
      >
        {{ label }}
        <span class="label-split" :innerHTML.prop="' '" />
        <transition name="popover">
          <div class="tooltip absolute text-white" v-if="state.tipMap[label]">
            {{ type }}
          </div>
        </transition>
      </div>
      <span class="label-split" :key="`${index}-split`" :innerHTML.prop="' '" />
    </template>
  </div>
</template>

<script lang="ts" src="./labels.ts"></script>
<style lang="less" src="./labels.less" scoped></style>
