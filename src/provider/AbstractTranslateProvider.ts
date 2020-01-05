import { VueConstructor } from 'vue'

import { PROVIDER } from '~/constants/constant'
import providerIcon from '~/constants/icon'
import { store } from '~/service/store'

export default abstract class AbstractTranslateProvider {
  // unique name of the translate provider
  public abstract uniqName: PROVIDER

  // container class
  public abstract containerComponentClass: VueConstructor

  /**
   * Translate the word. return a callback to show content of current translate
   * operation. Return a rejected promise if any error occured
   * and the error message will show as translate result
   */
  public abstract translate(word: string, payload?: unknown): Promise<() => void>

  // get currect set icon or default icon
  public get icon() {
    const key = store.config[this.uniqName].icon
    return (providerIcon[this.uniqName] as any)[key]
  }
}
