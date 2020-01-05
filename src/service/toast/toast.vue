<template>
  <transition name="toast">
    <div class="toast-box flex flex-center" v-if="state.visible">
      {{ props.text }}
    </div>
  </transition>
</template>

<script src="./toast.ts" lang="ts"></script>
<style src="./toast.less" lang="less" scoped></style>
