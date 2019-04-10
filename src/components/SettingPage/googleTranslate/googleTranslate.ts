import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { Config } from '~/store/index'

import {
  GOOGLE_TRANSLATE_HOST,
  GOOGLE_TRANSLATE_HOST_MAP,
} from '~/constants/constant'

@Component({
  name: 'GoogleTranslateSettings',
})
export default class GoogleTranslateSettings extends Vue {
  public form: Config['googleTranslate'] = {
    translateHost: GOOGLE_TRANSLATE_HOST.GOOGLE_COM,
  }

  public hostOptions = [
    { label: GOOGLE_TRANSLATE_HOST_MAP[GOOGLE_TRANSLATE_HOST.GOOGLE_COM], value: GOOGLE_TRANSLATE_HOST.GOOGLE_COM },
    { label: GOOGLE_TRANSLATE_HOST_MAP[GOOGLE_TRANSLATE_HOST.GOOGLE_CN], value: GOOGLE_TRANSLATE_HOST.GOOGLE_CN },
  ]

  public loadingSetting = true
  public toastTimeout = 0

  public mounted() {
    this.loadSettings()
  }

  private loadSettings() {
    this.form = {
      translateHost: this.config.googleTranslate.translateHost,
    }
    this.$nextTick(() => {
      this.loadingSetting = false
    })
  }

  /* eslint-disable-next-line @typescript-eslint/member-ordering */
  @Watch('form', { deep: true, immediate: false })
  protected formChange() {
    if (this.loadingSetting) {
      return
    }

    this.config.googleTranslate.translateHost = this.form.translateHost
    this.$store.saveConfig()

    if (!this.toastTimeout) {
      this.$toast('设置已保存！', 1000)
      this.toastTimeout = window.setTimeout(() => {
        this.toastTimeout = 0
      }, 1000)
    } else {
      window.clearTimeout(this.toastTimeout)
      this.toastTimeout = window.setTimeout(() => {
        this.$toast('设置已保存！', 1000)
        this.toastTimeout = 0
      }, 1000)
    }
  }
}
