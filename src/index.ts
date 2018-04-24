import IcibaMain from '~/src/components/IcibaMain/IcibaMain.vue'
import IcibaCircle from '~/src/components/IcibaCircle/IcibaCircle.vue'
import SizeHelper from '~/src/components/SizeHelper/SizeHelper.vue'

/* providers */
import IcibaProvider from '~/src/provider/Iciba/Iciba'
import GoogleTranslateProvider from '~/src/provider/GoogleTranslate/GoogleTranslate'
import BaiduTranslateProvider from '~/src/provider/BaiduTranslate/BaiduTranslate'

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
const icibaCircle = new IcibaCircle({ el: document.createElement('div') })
const sizeHelper = new SizeHelper({ el: document.createElement('div') })

icibaCircle.$on('translate', (param: { word: string, e: MouseEvent}) => {
  icibaMain.translate(param)
})
icibaCircle.setIcibaMain(icibaMain.$el)

icibaMain.sizeHelper = sizeHelper.$el

document.body.appendChild(icibaCircle.$el)
document.body.appendChild(icibaMain.$el)
document.body.appendChild(sizeHelper.$el)
