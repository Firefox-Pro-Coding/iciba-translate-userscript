<template>
  <transition name="iciba-main">
    <div
      class="iciba-main reset"
      :style="icibaMainStyle"
      v-show="visible">
      <div class="iciba-container" :style="icibaContainerStyle">
        <div class="input-container">
          <div class="input-box">
            <input
              class="search-input"
              type="text"
              @keypress.13="handleInputSearch"
              v-model="inputText" />
            <div class="setting-button"></div>
          </div>
          <div class="button-box">
            <div
              v-for="item in providers"
              :key="item.uniqName"
              @keydown.32.prevent
              class="button"
              @click="handleTranslateButtonClick(item)"
              :style="{ backgroundImage: `url('${item.icon}')` }">
            </div>
          </div>
        </div>
        <div class="content-box">
          <component
            class="provider-container"
            v-show="!loading && item.visible"
            v-for="item in providers"
            :ref="`provider-container-${item.uniqName}`"
            :is="item.containerComponentClass"
            :key="item.uniqName">
          </component>
          <div class="loading-tip content" v-show="loading">
            加载中{{ loadingDots }}
          </div>
          <div class="error-message content" v-show="!loading && errorMessage">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./IcibaMain.ts"></script>
<style lang="less" scoped>
  @import '~assets/styles/variables.less';
  @import '~assets/styles/hardreset.less';

  .focus-outline() {
    outline: 2px solid @input-outline-color;
    outline-offset: -1px;
  }

  .iciba-main /deep/ {
    .hard-reset();

    * {
      .hard-reset();
    }
  }

  .iciba-main.reset {
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


    .iciba-container {
      display: flex;
      flex-flow: column nowrap;
      position: absolute;
      top: 0;
      left: 0;
      width: 300px;
      height: auto;
      max-height: 300px;
      border: none;
      background: @background-level-5;
      box-shadow: 0 0 8px @box-shadow-color;
      letter-spacing: 0;
      font-size: @font-size-base;
      line-height: 1.5;
    }

    .input-container {
      @input-container-height: 28px;

      flex: 0 0 auto;
      display: flex;
      background: white;
      flex-flow: row nowrap;
      border-bottom: 1px solid @border-level-1;
      height: @input-container-height + 1px;

      .input-box {
        display: flex;
        flex: 1 1 auto;
        position: relative;

        .search-input {
          flex: 1 1 auto;
          border: none;
          padding: 0 7px;
          line-height: @input-container-height;
          height: @input-container-height;
          z-index: 2;
          color: @main-level-1;

          &:focus {
            .focus-outline();
          }
        }

        .setting-button {
          @offset: 2px;

          position: absolute;
          right: 0;
          top: 0;
          height: @input-container-height;
          width: @input-container-height - @offset;
          background: url('~assets/img/settings_149837.svg');
          background-position: center;
          background-repeat: no-repeat;
          background-size: 16px 16px;
          z-index: 2;
          cursor: pointer;
          opacity: 0.2;

          &:hover {
            opacity: 0.6;
          }

          &:active {
            background-position: center calc(50% + 1px);
            opacity: 0.9;
          }
        }
      }

      .button-box {
        display: flex;
        flex-flow: row nowrap;
        flex: 0 0 auto;

        .button {
          position: relative;
          width: @input-container-height + 1px;
          flex: 0 0 @input-container-height + 1px;
          height: @input-container-height;
          border: none;
          border-left: 1px solid @border-level-1;
          background-color: @background-level-5;
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

      .content {
        .container-reset();
      }
    }
  }
</style>
