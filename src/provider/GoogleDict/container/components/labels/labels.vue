<template>
  <div
    class="iciba-google-dict-label-box iciba-inline"
    :class="[colorClass, sizeClass]"
    v-if="labels && labels.length">
    <div
      :class="[labelClass, 'iciba-label', 'iciba-inline-block']"
      v-for="(label, index) in labels"
      @mouseover="handleShowPopover"
      @mouseleave="handleHidePopover"
      :key="index">
      {{ label }}
      <transition name="popover">
        <div class="popover-tooltip" v-if="popoverVisible">
          {{ type }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" src="./labels.ts"></script>
<style lang="less" src="./labels.less" scoped></style>
