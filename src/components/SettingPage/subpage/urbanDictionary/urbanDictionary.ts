import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { Config, defaultData } from '~/store/index'
import copy from '~/util/copy'
import providerIcon from '~/constants/icon'
import { PROVIDER } from '~/constants/constant'

import IconRadioGroup from '../../components/IconRadioGroup/IconRadioGroup.vue'

@Component({
  name: 'UrbanDictionarySettings',
  components: {
    IconRadioGroup,
  },
})
export default class UrbanDictionarySettings extends Vue {
  public form: Config[PROVIDER.URBAN_DICTIONARY] = copy(defaultData[PROVIDER.URBAN_DICTIONARY])
  public iconOptions = Object
    .entries(providerIcon[PROVIDER.URBAN_DICTIONARY])
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
    this.form = copy(this.config[PROVIDER.URBAN_DICTIONARY])
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

    this.config[PROVIDER.URBAN_DICTIONARY] = copy(this.form)

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
