import {
  defineComponent,
  computed,
  watch,
  reactive,
} from 'vue'

import ModalComponent from '~/components/modal/modal.vue'
import Scrollable from '~/components/Scrollable/Scrollable.vue'
import { getIcon, providers } from '~/provider'
import { bus, EVENTS } from '~/service/globalBus'
import { historyService } from '~/service/history'
import { HistoryItem } from '~/service/history/type'
import { toastService } from '~/service/toast'
import { viewService } from '~/service/view'

export default defineComponent({
  name: 'HistoryModal',
  components: {
    ModalComponent,
    Scrollable,
  },
  setup: () => {
    const state = reactive({
      showClearConfirm: false,
    })

    const handleClose = () => {
      viewService.closeHistory()
    }

    const handleExport = async () => {
      await historyService.loadHistory()
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(historyService.state.list, null, 2))
      toastService.toast({
        text: '已导出到控制台（F12查看）',
      })
    }

    const handleItemClick = (e: MouseEvent, item: HistoryItem) => {
      bus.emit({
        type: EVENTS.TRANSLATE,
        mouseEvent: e,
        word: item.word,
        param: {
          provider: item.provider,
        },
      })
    }

    const handleClear = () => {
      state.showClearConfirm = true
    }

    const handleClearCancel = () => {
      state.showClearConfirm = false
    }

    const handleClearConfirm = () => {
      state.showClearConfirm = false
      historyService.clearHistory()
    }

    const getProviderName = (id: string) => providers.find((v) => v.id === id)!.label

    const padLeft = (value: any, pad: string, length: number) => {
      const text = String(value)
      const diff = text.length - length
      if (diff <= 0) {
        return text
      }
      return `${pad.repeat(diff)}${text}`
    }

    const formatTimeFull = (time: number) => {
      const date = new Date(time)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()} ${padLeft(date.getHours(), '0', 2)}:${padLeft(date.getMinutes(), '0', 2)}`
    }

    const formatTime = (time: number) => {
      const now = Date.now()
      const diff = now - time
      if (diff < 1000 * 60) {
        return `${Math.floor(diff / 1000)} 秒前`
      }
      if (diff < 1000 * 60 * 60) {
        return `${Math.floor(diff / 1000 / 60)} 分钟前`
      }
      if (diff < 1000 * 60 * 60 * 24) {
        return `${Math.floor(diff / 1000 / 60 / 60)} 小时前`
      }

      return formatTimeFull(time)
    }

    watch(
      () => viewService.state.history,
      () => historyService.loadHistory(),
    )

    const list = computed(() => historyService.state.list)
    const visible = computed(() => viewService.state.history)

    return {
      getProviderName,
      state,
      visible,
      list,
      getIcon,

      handleClose,
      handleExport,
      handleItemClick,
      handleClear,
      handleClearCancel,
      handleClearConfirm,

      formatTime,
      formatTimeFull,
    }
  },
})
