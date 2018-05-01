import Vue from 'vue'

// tslint:disable-next-line no-import-side-effect
import '~/src/assets/styles/global.less'

import IcibaMain from '~/src/components/IcibaMain/IcibaMain.vue'
import IcibaCircle from '~/src/components/IcibaCircle/IcibaCircle.vue'
import SizeHelper from '~/src/components/SizeHelper/SizeHelper.vue'

const icibaMain = new IcibaMain({ el: document.createElement('div') })
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

const install = (top: any) => {
  const checkVuePropName = 'is_iciba_dev_global_vue_installed'
  if (process.env.NODE_ENV !== 'production' && !top.Vue && !top[checkVuePropName]) {
    top[checkVuePropName] = true
    const v = Vue as any
    const script = document.createElement('script')
    script.setAttribute('src', `https://cdn.bootcss.com/vue/${v.version}/vue.js`)
    document.body.appendChild(script)
  }
}

// install Vue to global namespace for dev
install(window)
