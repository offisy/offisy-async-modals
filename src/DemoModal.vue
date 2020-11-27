<template>
  <b-modal visible @ok="submit(value)" @hidden="onHidden">
    <b-form-group label="Number">
      <b-form-input type="number" v-model="value"/>
      <b-button @click="submit(value)">Second Sumbit</b-button>
    </b-form-group>
  </b-modal>
</template>

<script lang="ts">

import { AsyncModal } from '@/lib'
import { Component } from 'vue-property-decorator'

@Component
export default class DemoModal extends AsyncModal<number> {
  value!: number;
}
</script>
