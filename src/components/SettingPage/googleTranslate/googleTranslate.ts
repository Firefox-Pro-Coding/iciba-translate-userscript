import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { Config, defaultData } from '~/store/index'
import copy from '~/util/copy'

import {
  GOOGLE_TRANSLATE_HOST,
  GOOGLE_TRANSLATE_HOST_MAP,
} from '~/constants/constant'

import googleLanguages from '~/constants/googleLanguages'

@Component({
  name: 'GoogleTranslateSettings',
})
export default class GoogleTranslateSettings extends Vue {
  public googleLanguages = googleLanguages
  public form: Config['googleTranslate'] = copy(defaultData.googleTranslate)

  public hostOptions = [
    { label: GOOGLE_TRANSLATE_HOST_MAP[GOOGLE_TRANSLATE_HOST.GOOGLE_COM], value: GOOGLE_TRANSLATE_HOST.GOOGLE_COM },
    { label: GOOGLE_TRANSLATE_HOST_MAP[GOOGLE_TRANSLATE_HOST.GOOGLE_CN], value: GOOGLE_TRANSLATE_HOST.GOOGLE_CN },
  ]
  public languageOptions = googleLanguages

  public showMenu = true
  public loadingSetting = true
  public toastTimeout = 0

  public mounted() {
    this.loadSettings()
  }

  private loadSettings() {
    this.form = copy(this.config.googleTranslate)
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

    if (this.form.targetLanguage === this.form.secondTargetLanguage) {
      return
    }

    this.config.googleTranslate = copy(this.form)

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
