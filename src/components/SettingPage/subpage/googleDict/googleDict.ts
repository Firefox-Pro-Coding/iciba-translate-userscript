import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { Config, defaultData } from '~/store/index'
import copy from '~/util/copy'
import providerIcon from '~/constants/icon'
import {
  PROVIDER,
  GOOGLE_DICT_FOLD_STATUS,
  GOOGLE_DICT_FOLD_STATUS_MAP,
} from '~/constants/constant'

import IconRadioGroup from '../../components/IconRadioGroup/IconRadioGroup.vue'

@Component({
  name: 'BaiduTranslateSettings',
  components: {
    IconRadioGroup,
  },
})
export default class BaiduTranslateSettings extends Vue {
  public form: Config[PROVIDER.GOOGLE_DICT] = copy(defaultData[PROVIDER.GOOGLE_DICT])
  public iconOptions = Object
    .entries(providerIcon[PROVIDER.GOOGLE_DICT])
    .map(([k, v]) => ({
      icon: v,
      key: k,
    }))

  public foldOptions = [
    { label: GOOGLE_DICT_FOLD_STATUS_MAP[GOOGLE_DICT_FOLD_STATUS.FOLD], value: GOOGLE_DICT_FOLD_STATUS.FOLD },
    { label: GOOGLE_DICT_FOLD_STATUS_MAP[GOOGLE_DICT_FOLD_STATUS.HALF_FOLD], value: GOOGLE_DICT_FOLD_STATUS.HALF_FOLD },
    { label: GOOGLE_DICT_FOLD_STATUS_MAP[GOOGLE_DICT_FOLD_STATUS.UNFOLD], value: GOOGLE_DICT_FOLD_STATUS.UNFOLD },
  ]

  public loadingSetting = true
  public toastTimeout = 0

  public mounted() {
    this.loadSettings()
  }

  private loadSettings() {
    this.form = copy(this.config[PROVIDER.GOOGLE_DICT])
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

    this.config[PROVIDER.GOOGLE_DICT] = copy(this.form)

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
