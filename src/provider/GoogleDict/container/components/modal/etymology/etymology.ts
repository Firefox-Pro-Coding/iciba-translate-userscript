import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import fragment from '../../common/fragment/fragment.vue'
import imageLoader from '../imageLoader/imageLoader.vue'

@Component({
  name: 'GoogleDictContainerEtymology',
  components: {
    fragment,
    imageLoader,
  },
})
export default class extends Vue {
  @Prop()
  public etymology: unknown
}
