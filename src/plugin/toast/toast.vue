<template>
  <transition name="toast">
    <div v-if="visible" class="toast-box flex flex-center">
      {{ text }}
    </div>
  </transition>
</template>

<script src="./toast.ts" lang="ts"></script>
<style src="./toast.less" lang="less" scoped></style>
