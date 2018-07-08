// copy from vue-class-component
declare module 'vue-class-component' {
  import Vue, { ComponentOptions } from 'vue'
  import { VueClass } from 'vue-class-component/lib/declarations'

  export { createDecorator, VueDecorator, mixins } from 'vue-class-component/lib/util'

  interface NuxtComponentOptions<T extends Vue> extends ComponentOptions<T> {
    layout?: string
  }

  function Component<V extends Vue>(options: NuxtComponentOptions<V> & ThisType<V>)
    : <VC extends VueClass<V>>(target: VC) => VC;

  function Component<VC extends VueClass<Vue>>(target: VC): VC;

  namespace Component {
    function registerHooks(keys: string[]): void;
  }

  export default Component
}
