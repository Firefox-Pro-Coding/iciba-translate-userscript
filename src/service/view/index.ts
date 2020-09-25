import { reactive, watch } from 'vue'

const state = reactive({
  icibaMain: false,
  setting: false,
  history: false,
  googleDictModal: false,
})

const Statekeys = Object.keys(state) as Array<keyof typeof state>

const openIcibaMain = () => { state.icibaMain = true }
const closeIcibaMain = () => { state.icibaMain = false }
const openSettings = () => { state.setting = true }
const closeSettings = () => { state.setting = false }
const openHistory = () => { state.history = true }
const closeHistory = () => { state.history = false }
const openGoogleDictModal = () => { state.googleDictModal = true }
const closeGoogleDictModal = () => { state.googleDictModal = false }

const closeExcept = (key: keyof typeof state) => {
  Statekeys.forEach((k) => {
    if (key === k) {
      return
    }
    state[k] = false
  })
}

Statekeys.forEach((key) => {
  watch(
    () => state[key],
    () => {
      if (key === 'icibaMain') {
        return
      }
      if (state[key]) {
        closeExcept(key)
      }
    },
  )
})

export const viewService = {
  state,

  openIcibaMain,
  closeIcibaMain,
  openSettings,
  closeSettings,
  openHistory,
  closeHistory,
  openGoogleDictModal,
  closeGoogleDictModal,
}
