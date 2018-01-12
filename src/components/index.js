import vueAtoZSelect from "./vue-atoz-select.vue"

const atoZSelect = {
  install (Vue, options) {
    Vue.component(vueAtoZSelect.name, vueAtoZSelect)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(atoZSelect);
}

export default atoZSelect