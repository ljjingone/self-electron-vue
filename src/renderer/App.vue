<template>
  <div id="app">
    <button @click="handleCLick">button</button>
    <p>{{output}}</p>
    <button @click="handleCLick2">button</button>
    <p>{{output2}}</p>
  </div>
</template>

<script>
  import {generate_order, f2} from '../script/sjy.js'

  export default {
    name: 'trade_bot',
    data() {
      return {
        output: null,
        output2: null
      }
    },
    methods: {
      handleCLick() {
        this.output = generate_order();
      },
      handleCLick2() {
        this.output2 = f2();
      }
    }
  }
</script>

<style>
  /* CSS */
</style>
