<template>
  <div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class AsyncModal<T> extends Vue {
  modalId!: string;

  submit (result: T, hide = true) {
    (this.$children[0] as unknown as { hide(): void }).hide()
    this.$parent.$emit('result', result)
  }

  close () {
    (this.$children[0] as unknown as { hide(): void }).hide()
  }

  onHidden () {
    this.$parent.$emit('close')
  }
}
</script>
