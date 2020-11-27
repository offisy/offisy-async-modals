import Vue from 'vue'
import ModalPortal from '@/components/ModalPortal.vue'
import AsyncModal from '@/components/AsyncModal.vue'
import { VueClass } from 'vue-class-component/lib/declarations'
import { v4 as uuid } from 'uuid'

const PROP_NAME_PRIVATE = '__async_modal__'
const PROP_NAME = '$asyncModal'

export class ModalManager {
  vm: Vue
  root: Vue

  async show<T, V extends AsyncModal<T> = any> (modal: VueClass<V>, props?: { [key in keyof V | string]?: any; }): Promise<ModalResult<T>> {
    return new Promise<ModalResult<T>>(resolve => {
      const el = document.createElement('div')
      document.body.appendChild(el)

      let resolved = false

      const id = uuid()
      const Portal = ModalPortal.extend({
        parent: this.root,
        render: h => h(modal.extend({ data: () => props || {} }), {
          props: {
            modalId: id
          }
        }),
        beforeDestroy () {
          if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
          }
          this.$off(`modal:close:${id}`)
        }
      })
      const instance = new Portal()
      instance.$mount(el)

      instance.$on('close', () => {
        instance.$destroy()
        if (!resolved) {
          resolve({
            hasResult: false
          })
          resolved = true
        }
      })
      instance.$on('result', (result: T) => {
        if (!resolved) {
          resolve({
            hasResult: true,
            value: result
          })
          resolved = true
        } else {
          console.warn(`Async Modal ${id} return data after being destroyed`)
        }
      })
    })
  }

  constructor (vue: Vue) {
    this.vm = vue
    this.root = vue.$root
  }
}

export interface ModalResult<T> {
  hasResult: boolean;
  value?: T;
}

export const ModalPlugin = {
  install () {
    Vue.mixin({
      beforeCreate () {
        (this as any)[PROP_NAME_PRIVATE] = new ModalManager(this)
      }
    })

    /* eslint-disable no-prototype-builtins */
    if (!Vue.prototype.hasOwnProperty(PROP_NAME)) {
      Object.defineProperty(Vue.prototype, PROP_NAME, {
        get () {
          return (this as any)[PROP_NAME_PRIVATE]
        }
      })
    }
  }
}
