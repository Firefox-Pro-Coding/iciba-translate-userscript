<template>
  <div class="iciba-main">
    <div class="iciba-container" v-show="containerVisible">
      <div class="input-box">
        <input type="text" name="" value="">
        <div class="button-box">
          <!-- <div class="button" v-for="button in providers" :key="button.uniqName">

          </div> -->
        </div>
      </div>
      <div class="content-box" v-html="content">
      </div>
    </div>
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
<style lang="less" scope></style>
