<template>
  <div class="icon-box-wrapper relative" :ref="refs.container">
    <transition-group
      class="icon-box-container flex ease-linear"
      name="icon"
      tag="div"
    >
      <div
        class="icon-item relative select-none"
        :class="{ mask: iconItem.mask }"
        :style="{ zIndex: iconItem.z }"
        v-for="iconItem of state.list"
        @dragstart.prevent
        @mousedown.left="handleDragStart(iconItem)"
        @click.right.prevent="handleToggleVisibility(iconItem.id)"
        :key="iconItem.id"
      >
        <transition name="mask">
          <div
            class="mask-box absolute ease-in-out duration-200"
            v-show="iconItem.mask"
          />
        </transition>
        <div
          class="icon-box absolute rounded-3px flex flex-center"
          v-if="!iconItem.mask || true"
        >
          <i-icon
            class="icon"
            :class="{ inactive: !isProviderVisible(iconItem.id) }"
            size="32"
            :svg="iconItem.icon"
          />
        </div>
      </div>
    </transition-group>

    <p class="text-14 text-grey-400 mt-6px mb-0">
      拖拽调整顺序，右键切换显示隐藏<br>
      点击
      <span
        class="cursor-pointer hover:text-grey-600 hover:underline"
        @click="handleReset"
      >
        恢复默认排序
      </span>
    </p>
  </div>
</template>

<script lang="ts" src="./providerSort.ts"></script>
<style lang="sass" src="./providerSort.sass" scoped></style>
