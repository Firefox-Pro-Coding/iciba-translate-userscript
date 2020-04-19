<template>
  <div
    class="usage-overtime mt-4 flex-col items-stretch border-t border-grey-400 "
    v-if="m"
  >
    <div class="usage-title mt-2 pt-1 text-grey-500 text-18">
      Use over time for
      <span class="bg-grey-500 text-white px-1">
        {{ term }}
      </span>
    </div>
    <div
      class="usage-img-wrapper mt-2 overflow-hidden"
      :style="{
        height: `${m.tablet.height / 2 }px`,
        width: `${m.tablet.width / 2 }px`,
      }"
    >
      <image-loader
        :height="m.tablet.height"
        :width="m.tablet.width"
        :url="`https://www.gstatic.com/onebox/dictionary/${m.tablet.url}`"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./usageOvertime.ts"></script>
