<template lang="icibahtml">
  <div id="iciba-setting-modal">
    <div id="iciba-setting-window">
      <div class="tabs">
        <div class="tab" name="core">core settings</div>
        <div class="tab" name="provider">provider settings</div>
      </div>
      <div class="container" v-if="currentTab === 'core'">
        <div class="setting-item">
          <div class="description">
            dragable IcibaMain
          </div>
          <div class="">
            <div class="">true</div>
            <div class="">false</div>
          </div>
        </div>
      </div>
      <div class="container" v-if="currentTab === 'provider'">

      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./IcibaSetting.ts"></script>
<style lang="less" src="./IcibaSetting.less" scoped></style>
