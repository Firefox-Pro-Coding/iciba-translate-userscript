<template>
  <transition name="m">
    <div
      class="modal-component flex flex-center fixed inset-0 ease-in-out duration-300"
      v-if="state.visible"
      :style="modalStyle"
      @click.self="handleCloseModal"
    >
      <div class="modal-container flex-col ease-in-out duration-300">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./modal.ts"></script>
<style lang="sass" src="./modal.sass" scoped></style>
