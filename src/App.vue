<template>
  <div id="app">
    <b-button @click="openModal">Open Modal</b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DemoModal from '@/DemoModal.vue'

@Component({
})
export default class App extends Vue {
  async openModal () {
    const result = await this.$asyncModal.show<number, DemoModal>(DemoModal, {
      value: 3
    })
    console.log(result)
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
