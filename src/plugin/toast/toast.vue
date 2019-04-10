<template>
  <transition name="toast">
    <div v-if="visible" class="toast-box">
      {{ text }}
    </div>
  </transition>
</template>

<script src="./toast.ts" lang="ts"></script>
<style src="./toast.styl" lang="stylus" scoped></style>
