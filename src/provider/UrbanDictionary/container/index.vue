<template>
  <div class="urban-dictionary-box flex-col relative text-grey-900" :ref="refs.container">
    <scrollable class="scroll-container">
      <template #default="{ scrollBar }">
        <div
          class="content-box flex-col flex-auto text-14 break-words"
          :class="[
            scrollBar && 'py-10px pl-10px pr-14px',
            !scrollBar && 'p-10px',
          ]"
        >
          <template v-for="(item, index) of list" :key="index">
            <div class="row flex-col">
              <div class="index font-bold">
                {{ index + 1 }}. {{ item.word }}
              </div>

              <div class="definition">
                <template v-for="(definitionItem, definitionIndex) of extractDefinition(item.definition)">
                  <UKeyword
                    :content="definitionItem.text"
                    class="keyword definition-keyword"
                    :key="definitionIndex"
                    v-if="definitionItem.isTag"
                  />
                  <span
                    :textContent.prop="definitionItem.text"
                    :key="definitionIndex"
                    v-if="!definitionItem.isTag"
                  />
                </template>
              </div>

              <div class="text-12 text-grey-500 mt-1">
                <template v-for="(exampleItem, exampleIndex) of extractDefinition(item.example)">
                  <UKeyword
                    :content="exampleItem.text"
                    class="keyword example-keyword"
                    :key="exampleIndex"
                    v-if="exampleItem.isTag"
                  />
                  <span
                    :textContent.prop="exampleItem.text"
                    :key="exampleIndex"
                    v-if="!exampleItem.isTag"
                  />
                </template>
              </div>

              <div class="flex mt-1 items-center text-12 text-grey-500">
                <div class="mr-2 pr-1 flex flex-none">
                  <i-icon
                    size="14"
                    class="thumb-up thumb mr-1"
                    :svg="icon.like_179655"
                  />
                  {{ item.thumbs_up }}
                </div>
                <div class="flex mr-2 flex-none">
                  <i-icon
                    size="14"
                    color="#E64C3D"
                    class="thumb thumb-down mr-1"
                    :svg="icon.like_179655"
                  />
                  {{ item.thumbs_down }}
                </div>
                <div class="truncate">
                  {{ getTime(item.written_on) }}
                </div>
              </div>
            </div>

            <div
              v-if="index !== list.length - 1"
              class="divider my-2 bg-grey-300"
              :key="`${index}-divider`"
            />
          </template>
        </div>
      </template>
    </scrollable>

    <div
      class="u-toolip absolute bg-white w-full"
      v-for="item of state.tooltips"
      :key="item.id"
      :style="{ top: `${item.top}px`, left: `${item.left}px` }"
    >
      <div
        class="inner-content"
        v-if="item.text"
        :innerHtml.prop="item.text"
      />
      <div
        v-if="!item.text"
        class="inner-content flex flex-center"
      >
        <i-icon
          class="loadin-spinner rotate"
          size="24"
          color="#79d"
          :svg="icon.loading"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="sass" src="./index.sass" scoped></style>
