<template>
  <div
    class="label-box inline text-0"
    :class="[colorClass, sizeClass]"
    v-if="labels && labels.length"
  >
    <template v-for="(label, index) in props.labels" :key="index">
      <div
        class="label relative inline-flex text-grey-700"
        :class="[
          labelClass,
          index === labels.length - 1 ? 'last' : '',
        ]"
        @mouseover="shopTip(label)"
        @mouseleave="hideTip(label)"
      >
        {{ label }}
        <span class="label-split" v-html="' '" />
        <transition name="p">
          <div
            class="tooltip rounded-5 absolute text-white select-none ease-in-out"
            v-if="state.tipMap[label]"
          >
            {{ type }}
          </div>
        </transition>
      </div>
      <span
        class="label-split text-0"
        v-html="' '"
      />
    </template>
  </div>
</template>

<script lang="ts" src="./labels.ts"></script>
<style lang="sass" src="./labels.sass" scoped></style>
