<template>
  <transition name="iciba-main">
    <div
      id="iciba-main"
      class="iciba-main"
      :style="icibaMainStyle"
      v-show="visible">
      <div class="iciba-container" :style="icibaContainerStyle">
        <div class="input-box">
          <input
            class="search-input"
            type="text"
            @keypress.13="handleInputSearch"
            v-model="inputText">
          <div class="button-box">
            <div
              class="button"
              v-for="item in providers"
              :key="item.uniqName"
              @click="handleTranslateButtonClick(item)"
              :style="{ backgroundImage: `url('${item.icon}')` }">
            </div>
          </div>
        </div>
        <div class="content-box">
          <div
            class="provider-container"
            v-show="!loading && item.visible"
            v-for="item in providers"
            :key="item.uniqName">
            <div
              class="mounted-element"
              :class="[`provider-container-${item.uniqName}`]">
            </div>
          </div>
          <p class="loading-tip" v-show="loading">
            加载中{{ loadingDots }}
          </p>
          <p class="error-message" v-show="!loading && errorMessage">
            {{ errorMessage }}
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./IcibaMain.ts"></script>
<style lang="less" scoped>
  @import '~assets/styles/variables.less';
  @import '~assets/styles/hardreset.less';

  #iciba-main {
    position: absolute;
    display: block;
    z-index: 9999;
    overflow: visible;
    border: none;
    box-shadow: none;
    box-sizing: border-box;
    transition: 0.15s ease opacity, 0.15s ease transform;
    font-family: 'Microsoft Yahei', 'Arial', sans-serif;

    &.iciba-main-enter, &.iciba-main-leave-to {
      opacity: 0;
      transform: translateY(-6px);
    }

    &.iciba-main-leave, &.iciba-main-enter-to {
      opacity: 1;
      transform: none;
    }

    * {
      .hard-reset();
    }

    .iciba-container {
      display: flex;
      flex-flow: column nowrap;
      position: absolute;
      top: 0;
      left: 0;
      width: 300px;
      height: auto;
      border: none;
      background: @background-level-5;
      box-shadow: 0 0 8px @box-shadow-color;
      letter-spacing: 0;
      font-size: @font-size-base;
      line-height: 1.5;
    }

    .input-box {
      @input-box-height: 28px;

      display: flex;
      background: white;
      flex-flow: row nowrap;
      border-bottom: 1px solid @border-level-1;
      height: @input-box-height + 1px;

      .search-input {
        flex: 1 1 auto;
        border: none;
        padding: 0 7px;
        line-height: @input-box-height;
        height: @input-box-height;
        z-index: 2;
        color: @main-level-1;

        &:focus {
          outline: 2px solid @input-outline-color;
          outline-offset: -1px;
        }
      }

      .button-box {
        display: flex;
        flex-flow: row nowrap;
        flex: 0 0 auto;

        .button {
          width: @input-box-height + 1px;
          height: @input-box-height;
          flex: 0 0 @input-box-height + 1px;
          border: none;
          border-left: 1px solid @border-level-1;
          background-color: @background-level-5;
          z-index: 1;
          background-size: 16px;
          background-position: center;
          background-repeat: no-repeat;

          &:hover {
            background-color: #FCFCFC;
          }

          &:active {
            background-position: center calc(50% + 1px);
            background-color: @background-level-4;
            box-shadow: 0 0 6px #AAA inset;
          }
        }
      }
    }

    .content-box {
      display: flex;
      flex-flow: column nowrap;
      padding: 8px 10px 10px 10px;
    }
  }
</style>
