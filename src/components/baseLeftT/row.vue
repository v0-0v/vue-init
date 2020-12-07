<template>
  <div class="line-m-tt-row flex-row" v-if="value" v-ftitle>{{value}}</div>
  <div class="line-m-tt-row flex-row" v-else>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'leftrow',
  props: {
    value: {
      String,
      default: ''
    },
    height: {
      Number,
      default: 120
    },
    line: {
      Number,
      default: 1
    }
  }
};
</script>

<style scoped>

</style>
