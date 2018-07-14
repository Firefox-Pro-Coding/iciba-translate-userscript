import Vue from 'vue'

// #!dev_only
const install = (top: any) => {
  try {
    const checkVuePropName = 'is_iciba_dev_global_vue_installed'
    if (process.env.NODE_ENV !== 'production' && !top.Vue && !top[checkVuePropName]) {
      top[checkVuePropName] = true
      const v = Vue as any
      const script = document.createElement('script')
      script.setAttribute('src', `https://cdn.bootcss.com/vue/${v.version}/vue.js`)
      setTimeout(() => {
        document.body.appendChild(script)
      }, 3000)
    }
  } catch (e) {
    //
  }
}


// expose webpackHotUpdate out of sandbox
const exposeWebpackHotUpdate = (_module: any, _top: any, _unsafeWindow: any) => {
  try {
    // don't overwrite existed webpackHotUpdate
    if (_module.hot && !_unsafeWindow.webpackHotUpdate) {
      _unsafeWindow.webpackHotUpdate = _top.webpackHotUpdate
    }
  } catch (e) {
    //
  }
}

install(window)
exposeWebpackHotUpdate(module, top, unsafeWindow)
