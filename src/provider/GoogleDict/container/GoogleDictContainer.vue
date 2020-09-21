<template>
  <div class="google-dict-box flex-col relative break-words text-grey-900">
    <scrollable class="scroll-container">
      <template #default="ctx">
        <div
          class="google-content-simple relative flex-auto"
          :class="[
            ctx.scrollBar && 'py-10px pl-10px pr-14px',
            !ctx.scrollBar && 'p-10px',
          ]"
        >
          <div
            class="expand-button flex flex-center absolute"
            :class="{ 'with-scroll-bar': ctx.scrollBar }"
            title="展开"
            @click="handleOpenModal"
            v-if="containerData.data && containerData.data.length"
          >
            <i-icon :svg="icon.expand_128456" />
          </div>
          <!-- simple result -->
          <div class="google-content-box text-13">
            <div
              class="dictionary-data-box flex-col items-stretch"
              v-if="containerData.data && containerData.data.length"
            >
              <div
                class="dictionary-data-item"
                v-for="(dicDataItem, index) in containerData.data"
                :key="index"
              >
                <!-- entry -->
                <div
                  class="entry-box flex-col items-stretch"
                  v-if="dicDataItem.entries && dicDataItem.entries.length"
                >
                  <simple-entry
                    class="entry-item"
                    :class="{
                      '-mt-2px': entryIndex === 0,
                      'border-t border-grey-400 pt-1 mt-4': entryIndex !== 0,
                    }"
                    :entry="entry"
                    v-for="(entry, entryIndex) in dicDataItem.entries"
                    :key="entryIndex"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </scrollable>
  </div>
</template>

<script lang="ts" src="./GoogleDictContainer.ts"></script>
<style lang="sass" src="./GoogleDictContainer.sass" scoped></style>
