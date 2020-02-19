<template>
  <transition name="toast">
    <div
      class="toast-box fixed flex flex-center text-white ease-in-out duration-300"
      v-if="state.visible"
    >
      {{ props.text }}
    </div>
  </transition>
</template>

<script src="./toast.ts" lang="ts"></script>
<style src="./toast.less" lang="less" scoped></style>
