<template>
  <modal-component
    :open="visible"
    @close="handleCloseSetting"
  >
    <div class="setting-window relative flex bg-white shadow-8 ease-in-out duration-300 overflow-hidden">
      <div class="bg-indigo-500 flex-none items-center">
        <i-tabs
          v-model="state.tab"
          dark
          slider-color="rgba(255,255,255,0.8)"
        >
          <i-tab>设置</i-tab>
          <i-tab>core</i-tab>
          <i-tab>热键</i-tab>
          <template
            v-for="(c, i) in providersLabel"
            :key="i"
          >
            <i-tab v-if="c === 'Urban Dictionary'">Urban<br>Dictionary</i-tab>
            <i-tab v-else>{{ c }}</i-tab>
          </template>
        </i-tabs>
      </div>

      <i-tabs-items
        class="tabs-box flex-auto overflow-auto"
        v-no-overscroll
        v-model="state.tab"
      >
        <i-tab-item class="p-4"><about /></i-tab-item>
        <i-tab-item class="p-4"><core-setting /></i-tab-item>
        <i-tab-item class="p-4"><hot-key /></i-tab-item>
        <template
          v-for="(c, i) in providersPage"
          :key="i"
        >
          <i-tab-item class="p-4"><component :is="c" /></i-tab-item>
        </template>
      </i-tabs-items>
    </div>
  </modal-component>
</template>

<script lang="ts" src="./SettingPage.ts"></script>
<style lang="sass" src="./SettingPage.sass" scoped></style>
