<template>
  <div class="r-container flex-col relative">
    <scrollable
      class="scroll-container"
      :no-scroll-bar-style="{ 'padding-right': '10px' }"
      :scroll-bar-style="{ 'padding-right': '2px' }"
    >
      <div
        class="main-box flex-col flex-auto text-14 text-grey-800"
        v-if="data"
      >
        <div class="word flex items-center">
          <span>{{ data.word }}</span>
          <div
            class="play-sound flex flex-center"
            v-if="data.definition.audio"
            @click="handlePlay(data.definition.audio)"
          >
            <i-icon :svg="icon.play" />
          </div>
        </div>

        <div
          class="short-def mt-1"
          v-if="data.definition.short"
        >
          {{ data.definition.short }}
        </div>

        <div
          class="long-def mt-1 pt-2px text-12"
          v-if="data.definition.long"
        >
          <span class="text-grey-center">
            {{ data.definition.long }}
          </span>
        </div>

        <div
          class="group-item mt-1 flex text-12"
          v-for="group of data.definition.groups"
          :key="group.index"
        >
          <div class="group-index mt-2px mr-1 flex-none text-grey-700 font-bold">
            {{ group.index + 1 }}.
          </div>
          <div class="group-item-box">
            <div
              class="group-def-item flex mt-2px"
              v-for="(subGroup, index) of group.group"
              :key="index"
            >
              <div
                class="group-type px-1 mr-1 self-start flex-none"
                :class="{
                  'text-blue-500': subGroup.type === 'adv',
                  'text-orange-400': subGroup.type === 'adj',
                  'text-green-600': subGroup.type === 'v',
                  'text-red-400': subGroup.type === 'n',
                }"
              >
                {{ subGroup.type }}.&nbsp;
              </div>
              <div>
                {{ subGroup.definition }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </scrollable>
  </div>
</template>

<script lang="ts" src="./VocabularyContainer.ts"></script>
<style lang="less" src="./VocabularyContainer.less" scoped></style>
