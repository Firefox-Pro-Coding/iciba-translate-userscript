<template>
  <v-layout class="icon-radio">
    <v-layout
      class="icon-box pa-2 flex-nogrow"
      @click="handleSelect(icon.key)"
      v-for="(icon, index) of icons"
      :key="index">
      <img :src="icon.icon" />
      <v-icon
        v-if="icon.key === value"
        class="check-icon light-green--text">
        check_circle
      </v-icon>
    </v-layout>
  </v-layout>
</template>

<script lang="ts" src="./IconRadioGroup.ts"></script>
<style lang="less" src="./IconRadioGroup.less" scoped></style>
