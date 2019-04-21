import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { Config, defaultData } from '~/store/index'
import copy from '~/util/copy'

import {
  PROVIDER,
  PROVIDER_MAP,
} from '~/constants/constant'

@Component({
  name: 'CoreSettings',
})
export default class CoreSettings extends Vue {
  public $refs!: {
    sliderX: any
    sliderY: any
    sliderCut: any
    sliderIcibaWidth: any
  }
  public form: Config['core'] = copy(defaultData.core)
  public loadingSetting = true

  public providerOptions = [
    { label: PROVIDER_MAP[PROVIDER.ICIBA], value: PROVIDER.ICIBA },
    { label: PROVIDER_MAP[PROVIDER.GOOGLE_DICT], value: PROVIDER.GOOGLE_DICT },
    { label: PROVIDER_MAP[PROVIDER.GOOGLE_TRANSLATE], value: PROVIDER.GOOGLE_TRANSLATE },
    { label: PROVIDER_MAP[PROVIDER.BAIDU_TRANSLATE], value: PROVIDER.BAIDU_TRANSLATE },
  ]

  public toastTimeout = 0

  public mounted() {
    this.loadSettings()

    // shadow-root fix
    this.$nextTick(() => {
      this.$refs.sliderX.app = this.VApp.$el
      this.$refs.sliderY.app = this.VApp.$el
      this.$refs.sliderIcibaWidth.app = this.VApp.$el
    })
  }

  private loadSettings() {
    this.form = copy(this.config.core)
    this.$nextTick(() => {
      this.loadingSetting = false
    })
  }

  /* eslint-disable-next-line @typescript-eslint/member-ordering */
  @Watch('form.selectionMaxLengthCut', { deep: true, immediate: true })
  protected selectionMaxLengthCutChange() {
    if (this.form.selectionMaxLengthCut) {
      this.$nextTick(() => {
        if (this.$refs.sliderCut) {
          this.$refs.sliderCut.app = this.VApp.$el
        }
      })
    }
  }


  /* eslint-disable-next-line @typescript-eslint/member-ordering */
  @Watch('form', { deep: true, immediate: false })
  protected formChange() {
    if (this.loadingSetting) {
      return
    }

    if (this.form.defaultProvider === this.form.icibaCircleRightClickProvider) {
      return
    }

    this.config.core = copy(this.form)

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
