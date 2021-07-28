<template>
  <modal-component
    :open="visible"
    @close="handleClose"
  >
    <template #default>
      <div class="history-window flex-col bg-white shadow-8">
        <div class="px-4 py-3 border-b border-grey-300 font-medium">
          查词历史记录
        </div>
        <Scrollable class="flex-1 h-0">
          <template #default="{ scrollBar }">
            <div class="flex-col flex-1">
              <div
                class="px-4 py-4 text-grey-400 text-14"
                v-if="!list.length"
              >
                暂无查词历史记录
              </div>

              <div class="pt-2" v-if="!!list.length" />

              <div
                class="group flex justify-between items-center mx-2 my-px px-3 py-1 rounded-6 hover:bg-grey-100"
                :class="{ 'mr-4': scrollBar }"
                v-for="(item, index) of list"
                :key="index"
              >
                <div class="flex items-center flex-1 w-0">
                  <div class="text-grey-500 w-6 flex-none">
                    {{ index + 1 }}.
                  </div>
                  <div
                    class="hover:bg-grey-300 p-2 rounded-4 mr-2 ml-1 cursor-pointer"
                    @click="handleItemClick($event, item)"
                  >
                    <i-icon
                      class="flex-none"
                      :svg="getIcon(item.provider)"
                      :size="24"
                    />
                  </div>
                  <div class="flex items-center text-gray-800 text-16 mt-2px truncate">
                    <span class="bg-grey-200 group-hover:bg-grey-300 px-2 rounded-4 truncate leading-relaxed">
                      {{ item.word }}
                    </span>
                  </div>
                </div>

                <div class="flex items-center flex-none text-grey-400 text-14 ml-1">
                  <div class="ml-2">
                    {{ getProviderName(item.provider) }}
                  </div>
                  <div class="ml-2">
                    <span :title="formatTimeFull(item.time)">
                      {{ formatTime(item.time) }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex-1 w-full" />

              <div class="text-grey-400 text-14 p-4">
                <div>
                  这里保存了最近的50条查词记录。
                  <button
                    class="outline-none text-primary hover:underline"
                    @click="handleExport"
                  >
                    导出到控制台
                  </button>
                </div>
                <div>
                  10分钟内相同的记录会合并为一条。
                </div>
                <div v-if="!!list.length">
                  <div v-if="!state.showClearConfirm">
                    <button
                      class="outline-none text-primary hover:underline"
                      @click="handleClear"
                    >
                      清空历史记录
                    </button>
                  </div>
                  <div v-if="state.showClearConfirm">
                    确定要清空历史记录？
                    <button
                      class="outline-none text-primary hover:underline"
                      @click="handleClearCancel"
                    >
                      取消
                    </button>
                    <button
                      class="outline-none text-primary hover:underline ml-2"
                      @click="handleClearConfirm"
                    >
                      确定
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Scrollable>
      </div>
    </template>
  </modal-component>
</template>

<script lang="ts" src="./HistoryModal.ts"></script>
<style lang="sass" src="./HistoryModal.sass" scoped></style>
