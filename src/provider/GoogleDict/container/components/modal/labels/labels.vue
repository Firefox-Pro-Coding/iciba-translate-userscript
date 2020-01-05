<template>
  <div
    class="iciba-google-dict-label-box q-inline"
    :class="[colorClass, sizeClass]"
    v-if="labels && labels.length"
  >
    <template v-for="(label, index) in props.labels">
      <div
        class="iciba-label q-inline-block"
        :class="[
          labelClass,
          index === labels.length - 1 ? 'last' : '',
        ]"
        @mouseover="handleShowPopover(label)"
        @mouseleave="handleHidePopover(label)"
        :key="index"
      >
        {{ label }}
        <transition name="popover">
          <div class="popover-tooltip" v-if="state.popoverVisibleMap[label]">
            {{ type }}
          </div>
        </transition>
      </div>
      <span class="label-split" :key="`${index}-split`">&nbsp;</span>
    </template>
  </div>
</template>

<script lang="ts" src="./labels.ts"></script>
<style lang="less" src="./labels.less" scoped></style>
