<template>
  <div class="r-container flex-col relative">
    <scrollable
      class="scroll-container"
      :no-scroll-bar-style="{ 'padding-right': '10px' }"
      :scroll-bar-style="{ 'padding-right': '2px' }"
    >
      <div class="main-box flex-col flex-auto text-14 text-grey-800">
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

        <div class="short-def mt-1">
          {{ data.definition.short }}
        </div>

        <div class="long-def mt-2 text-12">
          <span class="text-grey-center">
            {{ data.definition.long }}
          </span>
        </div>

        <div
          class="group-item mt-2 flex text-12"
          v-for="group of data.definition.groups"
          :key="group.index"
        >
          <div class="group-index mr-1 flex-none text-grey-center">
            {{ group.index + 1 }}.
          </div>
          <div class="group-item-box">
            <div
              class="group-def-item flex"
              v-for="(subGroup, index) of group.group"
              :key="index"
            >
              <div class="group-type px-1 mr-1 text-green-600 self-start flex-none">
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
