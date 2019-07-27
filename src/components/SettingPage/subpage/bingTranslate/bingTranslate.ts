import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { Config, defaultData } from '~/store/index'
import copy from '~/util/copy'
import providerIcon from '~/constants/icon'
import { PROVIDER } from '~/constants/constant'
import { bingLanguagesOptions } from '~/constants/bingLanguages'

import IconRadioGroup from '../../components/IconRadioGroup/IconRadioGroup.vue'

@Component({
  name: 'BingTranslateSettings',
  components: {
    IconRadioGroup,
  },
})
export default class BingTranslateSettings extends Vue {
  public form: Config[PROVIDER.BING_TRANSLATE] = copy(defaultData[PROVIDER.BING_TRANSLATE])
  public languageOptions = bingLanguagesOptions
  public iconOptions = Object
    .entries(providerIcon[PROVIDER.BING_TRANSLATE])
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
    this.form = copy(this.config[PROVIDER.BING_TRANSLATE])
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

    this.config[PROVIDER.BING_TRANSLATE] = copy(this.form)

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
