// import * as crypto from 'crypto'
import Vue from 'vue'

import { PROVIDER } from '~/constants/constant'
import providerIcon from '~/constants/icon'
import store, { Config } from '~/store/index'

type storeName = Exclude<keyof Config, 'core'>

export default abstract class AbstractTranslateProvider {
  // get currect set icon or default icon
  protected getIconByStoreName(name: storeName) {
    return store.config[name].icon
  }

  // get currect set icon or default icon
  public get icon() {
    const key = store.config[this.uniqName].icon
    return (providerIcon[this.uniqName] as any)[key]
  }

  // unique name of the translate provider
  public abstract uniqName: PROVIDER

  // container class
  public abstract containerComponentClass: typeof Vue

  /**
   * translate the word. return a rejected promise if any error occured
   * and the error message will show as translate result
   */
  public abstract translate(word: string): Promise<void>
}
