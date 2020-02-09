<template>
  <div
    class="label-box q-inline"
    :class="[colorClass, sizeClass]"
    v-if="labels && labels.length"
  >
    <template v-for="(label, index) in props.labels">
      <div
        class="label inline-flex"
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
          <div class="tooltip q-flex" v-if="state.tipMap[label]">
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
