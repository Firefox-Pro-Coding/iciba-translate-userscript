<template>
  <div class="r-container flex-co">
    <scrollable
      class="scroll-container"
      :no-scroll-bar-style="{ 'padding-right': '10px' }"
      :scroll-bar-style="{ 'padding-right': '2px' }"
    >
      <div class="main-box flex-co grey--text text--darken-3">
        <div class="word flex align-center">
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

        <div class="loing-def mt-2 caption">
          <span class="grey--text text--darken">
            {{ data.definition.long }}
          </span>
        </div>

        <div
          class="group-item mt-2 flex caption"
          v-for="group of data.definition.groups"
          :key="group.index"
        >
          <div class="group-index mr-1 flex-noresize grey--text">
            {{ group.index + 1 }}.
          </div>
          <div class="group-item-box">
            <div
              class="group-def-item flex"
              v-for="(subGroup, index) of group.group"
              :key="index"
            >
              <div class="group-type px-1 mr-1 green--text text--lighten-2 align-self-start flex-noresize">
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
