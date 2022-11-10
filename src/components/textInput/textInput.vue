<template>
  <div>
    <input
      :value="props.modelValue"
      class="input py-5px px-2 m-2px"
      :type="props.inputType"
      :placeholder="props.placeholder"
      @input="handleInput($event)"
      @keydown.capture.stop
    >
  </div>
</template>

<script src="./textInput.ts" lang="ts"></script>
<style src="./textInput.sass" lang="sass" scoped></style>
