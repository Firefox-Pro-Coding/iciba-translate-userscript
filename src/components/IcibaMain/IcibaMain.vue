<template>
  <div class="iciba-main">
    <!-- <main-frame class=""></main-frame> -->
    <iciba-circle
      ref="circle"
      v-model="circleVisible"
      :position="circleStyle"
      :word="word"
      @circle_click="handleCircleClick">
    </iciba-circle>
  </div>
</template>

<script lang="ts" src="./IcibaMain.ts"></script>
<style src="./IcibaMain.less" lang="less" scope></style>
