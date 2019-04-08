import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { Config } from '~/store/index'

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
  }
  public currentTab: string = 'core'
  public form: Config['common'] = {
    defaultProvider: PROVIDER.ICIBA,
    pressCtrlToDrag: false,
    pressCtrlToShowCircle: false,
    mouseOverTranslate: false,
    icibaCircleOffsetX: 7,
    icibaCircleOffsetY: 7,
  }
  public x = 7
  public loadingSetting = true

  public providerOptions = [
    { label: PROVIDER_MAP[PROVIDER.ICIBA], value: PROVIDER.ICIBA },
    { label: PROVIDER_MAP[PROVIDER.GOOGLE_DICT], value: PROVIDER.GOOGLE_DICT },
    { label: PROVIDER_MAP[PROVIDER.GOOGLE_TRANSLATE], value: PROVIDER.GOOGLE_TRANSLATE },
    { label: PROVIDER_MAP[PROVIDER.BAIDU_TRANSLATE], value: PROVIDER.BAIDU_TRANSLATE },
  ]

  public mounted() {
    this.loadSettings()

    // shadow-root fix
    this.$nextTick(() => {
      this.$refs.sliderX.app = this.VApp.$el
      this.$refs.sliderY.app = this.VApp.$el
    })
  }

  private loadSettings() {
    this.form = {
      defaultProvider: this.config.common.defaultProvider,
      pressCtrlToDrag: this.config.common.pressCtrlToDrag,
      pressCtrlToShowCircle: this.config.common.pressCtrlToShowCircle,
      mouseOverTranslate: this.config.common.mouseOverTranslate,
      icibaCircleOffsetX: this.config.common.icibaCircleOffsetX,
      icibaCircleOffsetY: this.config.common.icibaCircleOffsetY,
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

    this.config.common.defaultProvider = this.form.defaultProvider
    this.config.common.pressCtrlToDrag = this.form.pressCtrlToDrag
    this.config.common.pressCtrlToShowCircle = this.form.pressCtrlToShowCircle
    this.config.common.mouseOverTranslate = this.form.mouseOverTranslate
    this.config.common.icibaCircleOffsetX = this.form.icibaCircleOffsetX
    this.config.common.icibaCircleOffsetY = this.form.icibaCircleOffsetY

    this.$store.saveConfig()
  }
}
