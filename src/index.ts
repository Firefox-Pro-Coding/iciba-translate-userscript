// tslint:disable-next-line
import IcibaMain from '~/src/components/IcibaMain/IcibaMain.vue'
import IcibaCircle from '~/src/components/IcibaCircle/IcibaCircle.vue'

// providers
import IcibaProvider from '~/src/provider/iciba/index'
import GoogleTranslateProvider from '~/src/provider/googleTranslate/index'
import BaiduTranslateProvider from '~/src/provider/baiduTranslate/index'

const icibaMain = new IcibaMain({
  el: document.createElement('div'),
  data: {
    providers: [
      new IcibaProvider(),
      new GoogleTranslateProvider(),
      new BaiduTranslateProvider(),
    ],
  },
})
const icibaCircle = new IcibaCircle({
  el: document.createElement('div'),
})

icibaCircle.$on('translate', (param: { word: string, e: MouseEvent}) => {
  icibaMain.translate(param)
})

icibaCircle.setIcibaMain(icibaMain.$el)

document.body.appendChild(icibaCircle.$el)
document.body.appendChild(icibaMain.$el)
