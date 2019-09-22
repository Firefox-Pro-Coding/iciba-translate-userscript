<template>
  <div
    class="iciba-google-dict-label-box q-inline"
    :class="[colorClass, sizeClass]"
    v-if="labels && labels.length">
    <template v-for="(label, index) in labels">
      <div
        :class="[
          labelClass,
          'iciba-label',
          'q-inline-block',
          index === labels.length - 1 ? 'last' : '',
        ]"
        @mouseover="handleShowPopover(label)"
        @mouseleave="handleHidePopover(label)"
        :key="index">
        {{ label }}
        <transition name="popover">
          <div class="popover-tooltip" v-if="popoverVisibleMap[label]">
            {{ type }}
          </div>
        </transition>
      </div>
      <span :key="`${index}-split`" style="font-size: 0;">&nbsp;</span>
    </template>
  </div>
</template>

<script lang="ts" src="./labels.ts"></script>
<style lang="less" src="./labels.less" scoped></style>
