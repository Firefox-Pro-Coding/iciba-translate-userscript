<template>
  <div class="urban-dictionary-result-container flex-co" ref="container">
    <scrollable class="scroll-container">
      <div class="urban-dictionary-content flex-co">
        <template v-if="result && result.list">
          <div
            class="row flex-co"
            :class="{ 'mt-3': index > 0 }"
            v-for="(item, index) of result.list"
            :key="index">
            <div class="index subheading">
              {{ index + 1 }}. {{ item.word }}
            </div>
            <div class="definition">
              <template v-for="(definitionItem, definitionIndex) of extractDefinition(item.definition)">
                <UKeyword
                  :content="definitionItem.text"
                  class="keyword blue--text text--darken-1"
                  :key="definitionIndex"
                  v-if="definitionItem.isTag" />
                <span
                  :text-content.prop="definitionItem.text"
                  :key="definitionIndex"
                  v-if="!definitionItem.isTag"></span>
              </template>
            </div>
            <div class="caption grey--text text--darken-1 mt-1">
              <template v-for="(exampleItem, exampleIndex) of extractDefinition(item.example)">
                <UKeyword
                  :content="exampleItem.text"
                  class="keyword blue--text text--darken-1"
                  :key="exampleIndex"
                  v-if="exampleItem.isTag" />
                <span
                  :text-content.prop="exampleItem.text"
                  :key="exampleIndex"
                  v-if="!exampleItem.isTag"></span>
              </template>
            </div>
            <div class="flex mt-2 align-center caption grey--text">
              <div class="mr-2 pr-1 flex" style="flex: 0 0 auto">
                <i-icon
                  size="14"
                  class="mr-1"
                  style="opacity: 0.8"
                  :svg="icon.like_179655" />
                {{ item.thumbs_up }}
              </div>
              <div class="flex mr-2" style="flex: 0 0 auto">
                <i-icon
                  size="14"
                  color="#E64C3D"
                  style="opacity: 0.8; transform: translate(0, 3px) rotate(180deg)"
                  class="mr-1"
                  :svg="icon.like_179655" />
                {{ item.thumbs_down }}
              </div>
              <div class="text-truncate">
                {{ getTime(item.written_on) }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </scrollable>

    <div
      v-for="item of tooltips"
      :key="item.id"
      :style="{ top: `${item.top}px`, left: `${item.left}px` }"
      class="u-keyword-toolip">
      <div
        class="inner-content"
        v-if="item.text"
        :inner-html.prop="item.text">
      </div>
      <div
        v-if="!item.text"
        class="inner-content flex flex-center">
        <i-icon class="rotate" size="30" color="#777777" :svg="icon.loading" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./UrbanDictionary.ts"></script>
<style lang="less" src="./UrbanDictionary.less" scoped></style>
