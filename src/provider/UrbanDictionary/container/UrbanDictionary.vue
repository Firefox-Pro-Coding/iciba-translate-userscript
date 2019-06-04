<template>
  <div class="urban-dictionary-result-container flex-co" ref="container">
    <scrollable class="scroll-container">
      <div class="urban-dictionary-content flex-co">
        <template v-if="result && result.list">
          <template v-for="(item, index) of result.list">
            <div
              class="row flex-co"
              :key="index">
              <div class="index font-weight-bold">
                {{ index + 1 }}. {{ item.word }}
              </div>
              <div class="definition">
                <template v-for="(definitionItem, definitionIndex) of extractDefinition(item.definition)">
                  <UKeyword
                    :content="definitionItem.text"
                    class="keyword definition-keyword"
                    :key="definitionIndex"
                    v-if="definitionItem.isTag" />
                  <span
                    :text-content.prop="definitionItem.text"
                    :key="definitionIndex"
                    v-if="!definitionItem.isTag"></span>
                </template>
              </div>
              <div class="caption grey--text mt-1">
                <template v-for="(exampleItem, exampleIndex) of extractDefinition(item.example)">
                  <UKeyword
                    :content="exampleItem.text"
                    class="keyword example-keyword"
                    :key="exampleIndex"
                    v-if="exampleItem.isTag" />
                  <span
                    :text-content.prop="exampleItem.text"
                    :key="exampleIndex"
                    v-if="!exampleItem.isTag"></span>
                </template>
              </div>
              <div class="flex mt-1 align-center caption grey--text">
                <div class="mr-2 pr-1 flex flex-noresize">
                  <i-icon
                    size="14"
                    class="thumb-up thumb mr-1"
                    :svg="icon.like_179655" />
                  {{ item.thumbs_up }}
                </div>
                <div class="flex mr-2 flex-noresize">
                  <i-icon
                    size="14"
                    color="#E64C3D"
                    class="thumb thumb-down mr-1"
                    :svg="icon.like_179655" />
                  {{ item.thumbs_down }}
                </div>
                <div class="text-truncate">
                  {{ getTime(item.written_on) }}
                </div>
              </div>
            </div>
            <div
              v-if="index !== result.list.length - 1"
              class="divider my-2 grey lighten-2"
              :key="`${index}-divider`">
            </div>
          </template>
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
