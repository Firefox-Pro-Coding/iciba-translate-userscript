<template>
  <div
    class="iciba-google-dict-label-box q-inline"
    :class="[colorClass, sizeClass]"
    v-if="labels && labels.length">
    <div
      :class="[labelClass, 'iciba-label', 'q-inline-block']"
      v-for="(label, index) in labels"
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
  </div>
</template>

<script lang="ts" src="./labels.ts"></script>
<style lang="less" src="./labels.less" scoped></style>
