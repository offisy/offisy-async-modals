import Vue from 'vue'
import { ModalManager } from '@/plugin/ModalPlugin'

declare module 'vue/types/vue' {
  interface Vue {
    $asyncModal: ModalManager;
  }
}
