import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { Config, defaultData } from '~/store/index'
import copy from '~/util/copy'
import providerIcon from '~/constants/icon'

import {
  GOOGLE_TRANSLATE_HOST,
  GOOGLE_TRANSLATE_HOST_MAP,
  PROVIDER,
} from '~/constants/constant'

import { googleLanguagesOptions } from '~/constants/googleLanguages'

import IconRadioGroup from '../../components/IconRadioGroup/IconRadioGroup.vue'

@Component({
  name: 'GoogleTranslateSettings',
  components: {
    IconRadioGroup,
  },
})
export default class GoogleTranslateSettings extends Vue {
  public form: Config[PROVIDER.GOOGLE_TRANSLATE] = copy(defaultData[PROVIDER.GOOGLE_TRANSLATE])

  public hostOptions = [
    { label: GOOGLE_TRANSLATE_HOST_MAP[GOOGLE_TRANSLATE_HOST.GOOGLE_COM], value: GOOGLE_TRANSLATE_HOST.GOOGLE_COM },
    { label: GOOGLE_TRANSLATE_HOST_MAP[GOOGLE_TRANSLATE_HOST.GOOGLE_CN], value: GOOGLE_TRANSLATE_HOST.GOOGLE_CN },
  ]
  public languageOptions = googleLanguagesOptions
  public iconOptions = Object
    .entries(providerIcon[PROVIDER.GOOGLE_TRANSLATE])
    .map(([k, v]) => ({
      icon: v,
      key: k,
    }))

  public loadingSetting = true
  public toastTimeout = 0

  public mounted() {
    this.loadSettings()
  }

  private loadSettings() {
    this.form = copy(this.config[PROVIDER.GOOGLE_TRANSLATE])
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

    this.config[PROVIDER.GOOGLE_TRANSLATE] = copy(this.form)

    this.$store.saveConfig()

    if (this.toastTimeout) {
      window.clearTimeout(this.toastTimeout)
    }
    this.toastTimeout = window.setTimeout(() => {
      this.$toast('设置已保存！', 2000)
      this.toastTimeout = 0
    }, 1000)
  }
}
