import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

// import checked_291201 from '~/assets/img/checked_291201.svg'
// import close from '~/assets/img/close.svg'
// import drag_462998 from '~/assets/img/drag_462998.svg'
// import expand_128456 from '~/assets/img/expand_128456.svg'
// import minus from '~/assets/img/minus.svg'
// import pin_25474 from '~/assets/img/pin_25474.svg'
// import plus from '~/assets/img/plus.svg'
// import settings_149837 from '~/assets/img/settings_149837.svg'

// import play_speaker_filled_audio_tool_59284 from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'

// import mdi_baseline_check_box_24px from '~/assets/img/mdi/baseline-check_box-24px.svg'
// import mdi_baseline_check_box_outline_blank_24px from '~/assets/img/mdi/baseline-check_box_outline_blank-24px.svg'
// import mdi_baseline_radio_button_checked_24px from '~/assets/img/mdi/baseline-radio_button_checked-24px.svg'
// import mdi_baseline_radio_button_unchecked_24px from '~/assets/img/mdi/baseline-radio_button_unchecked-24px.svg'

// import providerIcon_iciba_iciba_1362193 from '~/assets/img/providerIcon/iciba/iciba_1362193.svg'
// import providerIcon_iciba_search from '~/assets/img/providerIcon/iciba/search.svg'
// import providerIcon_googleDict_type_0_google from '~/assets/img/providerIcon/googleDict/type_0_google.svg'
// import providerIcon_googleDict_type_2_search_281764 from '~/assets/img/providerIcon/googleDict/type_2_search_281764.svg'
// import providerIcon_googleDict_type_3_search_281781 from '~/assets/img/providerIcon/googleDict/type_3_search_281781.svg'
// import providerIcon_googleDict_type_4_google_356049 from '~/assets/img/providerIcon/googleDict/type_4_google_356049.svg'
// import providerIcon_googleTranslate_type_1_translate_281759 from '~/assets/img/providerIcon/googleTranslate/type_1_translate_281759.svg'
// import providerIcon_googleTranslate_type_2_translate_281776 from '~/assets/img/providerIcon/googleTranslate/type_2_translate_281776.svg'
// import providerIcon_googleTranslate_type_2_translate_324121 from '~/assets/img/providerIcon/googleTranslate/type_2_translate_324121.svg'
// import providerIcon_googleTranslate_type_3_google_814137 from '~/assets/img/providerIcon/googleTranslate/type_3_google_814137.svg'
// import providerIcon_baiduTranslate_baidu from '~/assets/img/providerIcon/baiduTranslate/baidu.svg'
// import providerIcon_baiduTranslate_baiduCircle from '~/assets/img/providerIcon/baiduTranslate/baiduCircle.svg'
// import providerIcon_sougouTranslate_icon_no_circle from '~/assets/img/providerIcon/sougouTranslate/icon_no_circle.svg'
// import providerIcon_sougouTranslate_icon_with_circle from '~/assets/img/providerIcon/sougouTranslate/icon_with_circle.svg'

@Component({
  name: 'IIcon',
})
export default class IIcon extends Vue {
  @Prop({ type: String, default: '' })
  public svg!: string

  @Prop({ type: [Number, String], default: 16 })
  public size!: number | string

  public get computedSize() {
    const size = parseInt(`${this.size}`, 10)
    if (`${size}` === `${this.size}`) {
      return `${size}px`
    }
    return this.size
  }
}
