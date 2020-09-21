// import Vue from 'vue'

const webpackHookKey = 'webpackHotUpdateiciba'

/* eslint-disable no-underscore-dangle */
// #!dev_only attach Vue to the devtools hook
const install = (_top: any) => {
  // top.Vue = top.Vue || Vue
  // top.Vue.config.devtools = true
  // if (top.__VUE_DEVTOOLS_GLOBAL_HOOK__ && !top.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue) {
  //   top.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = Vue
  // }
}

// expose webpackHotUpdate out of sandbox
const exposeWebpackHotUpdate = (_module: any, _top: any, _unsafeWindow: any) => {
  try {
    // don't overwrite existed webpackHotUpdate
    if (_module.hot && !_unsafeWindow[webpackHookKey]) {
      _unsafeWindow[webpackHookKey] = _top[webpackHookKey]
    }
  } catch (e) {
    //
  }
}

// install(window)
setTimeout(() => {
  install(unsafeWindow)
  exposeWebpackHotUpdate(module, top, unsafeWindow)
})
