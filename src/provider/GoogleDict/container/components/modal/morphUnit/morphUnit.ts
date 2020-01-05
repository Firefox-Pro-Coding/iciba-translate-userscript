import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'GMorphUnits',
  props: {
    morphUnits: null,
  },
  setup: (props) => ({
    props,
  }),
})
