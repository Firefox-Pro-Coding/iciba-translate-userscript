<template>
  <div
    class="etymology-box mt-2 pt-2 flex-col items-stretch"
    v-if="props.etymology"
  >
    <div class="etymology-title text-grey text-18">Origin</div>
    <div
      class="etymology-img-box mt-2"
      v-if="props.etymology.images"
    >
      <image-loader
        :height="props.etymology.images.tablet.height"
        :width="props.etymology.images.tablet.width"
        :url="`https://www.gstatic.com/onebox/dictionary/${props.etymology.images.tablet.url}`"
      />
    </div>
    <div class="etymology-text mt-2 text-grey">
      <fragment
        class="etymology-frag"
        :fragment="props.etymology.etymology.fragments"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./etymology.ts"></script>
<style lang="sass" src="./etymology.sass" scoped></style>
