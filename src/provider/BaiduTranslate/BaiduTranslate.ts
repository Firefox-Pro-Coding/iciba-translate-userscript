import iconBase64 from '~/src/assets/img/providerIcon/baiduTranslate/baidu.svg'
// import { got } from '~/src/lib/gmapi'
import AbstractTranslateProvider from '../AbstractTranslateProvider'
import BaiduTranslateContainer from './container/BaiduTranslateContainer.vue'

class BaiduTranslateProvider extends AbstractTranslateProvider {
  public uniqName = 'BaiduTranslate'
  public settingDescriptor = []
  public containerComponentClass = BaiduTranslateContainer

  public constructor() {
    super()
    this.icons = [
      iconBase64,
    ]
  }

  public async translate(word: string) {
    console.log(word)
    return Promise.resolve()
  }


  // public detectLang(word: string) {
  //   const formdata = new FormData()
  //   formdata.append('query', encodeURIComponent(Array.from(word).splice(0, 25).join('')))
  //   const langDetect = await got({
  //     method: 'POST',
  //     headers: {
  //       referer: 'http://fanyi.baidu.com',
  //     },
  //     url: 'http://fanyi.baidu.com/langdetect',
  //     data: formdata,
  //     timeout: 5000,
  //   })
  //   let result = JSON.parse(langDetect)
  //   if (result.error === 0) {
  //     return result.lan
  //   } else {
  //     throw new Error('翻译文本语言未知！')
  //   }
  // }
  //
  // public async getTranslateResult (lang_detect, target_lang, word) {
  //   let translation_formData = new FormData()
  //   translation_formData.append('from', lang_detect)
  //   translation_formData.append('to', target_lang)
  //   translation_formData.append('query', word)
  //   translation_formData.append('transtype', 'translang')
  //
  //   let result = await got({
  //     method: 'POST',
  //     referer: 'http://fanyi.baidu.com',
  //     url: 'http://fanyi.baidu.com/v2transapi',
  //     data: translation_formData,
  //     timeout: 5000
  //   })
  //
  //   result = JSON.parse(result)
  //   if (result.trans_result.type === 2 && result.trans_result.status === 0) {
  //     return result.trans_result.data[0].dst
  //   } else {
  //     throw new Error('翻译出错！')
  //   }
  // }
}

export default BaiduTranslateProvider
