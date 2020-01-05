<template>
  <div class="google-dict-result-container flex-co">
    <scrollable
      :no-scroll-bar-style="{ 'padding-right': '10px' }"
      :scroll-bar-style="{ 'padding-right': '2px' }"
      class="scroll-container"
    >
      <template #default="{ scrollBar }">
        <div class="google-content-simple">
          <div
            class="expand-button flex flex-center"
            :class="{ 'with-scroll-bar': scrollBar }"
            title="展开"
            @click="handleOpenModal"
            v-if="data.data && data.data.length"
          >
            <i-icon :svg="icon.expand_128456" />
          </div>
          <!-- simple result -->
          <div class="google-content-box">
            <div
              class="dictionary-data-box flex-co align-stretch"
              v-if="data.data && data.data.length"
            >
              <div
                class="dictionary-data-item"
                v-for="(dicDataItem, index) in data.data"
                :key="index"
              >
                <!-- entry -->
                <div
                  class="entry-box flex-co align-stretch"
                  v-if="dicDataItem.entries && dicDataItem.entries.length"
                >
                  <simple-entry
                    class="entry-item"
                    :entry="entry"
                    v-for="(entry, entryIndex) in dicDataItem.entries"
                    :key="entryIndex"
                  />
                </div>
              </div>
            </div>

            <div class="translate-data-box" v-if="data.translateData">
              <div
                v-if="
                  data.translateData.sentences
                    && data.translateData.sentences[0]
                    && data.translateData.sentences[0].trans
                "
              >
                {{ data.translateData.sentences[0].trans }}
              </div>
              <div class="translate-source">google字典无结果，以上内容来自谷歌翻译</div>
            </div>
          </div>
        </div>
      </template>
    </scrollable>
  </div>
</template>

<script lang="ts" src="./GoogleDictContainer.ts"></script>
<style lang="less" src="./GoogleDictContainer.less" scoped></style>
