<template>
  <div class="flex-col relative text-grey-900">
    <scrollable class="scroll-container">
      <template #default="{ scrollBar }">
        <div
          class="main-box flex-col flex-auto text-14 text-grey-800 break-words"
          :class="[
            scrollBar && 'pt-10px pb-10px pl-10px pr-14px',
            !scrollBar && 'p-10px',
          ]"
          v-if="data"
        >
          <div class="word flex items-center">
            <span class="text-15">{{ data.word }}</span>
            <div
              class="play-sound flex flex-center mt-2px ml-1"
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
            class="long-def mt-1 pt-2px text-13"
            v-if="data.definition.long"
          >
            <span class="text-grey-500">
              {{ data.definition.long }}
            </span>
          </div>

          <div
            class="group-item mt-1 flex text-13"
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
      </template>
    </scrollable>
  </div>
</template>

<script lang="ts" src="./VocabularyContainer.ts"></script>
<style lang="sass" src="./VocabularyContainer.sass" scoped></style>
