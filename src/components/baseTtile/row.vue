<template>
  <div class="line-h-h" :style="{width:`calc(${rows} * 41px - 1px)`}">
    <div class="line-h-h-t">{{value}}</div>
    <div class="line-h-h-ts">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'row',
  props: {
    rows: {
      Number,
      default: 0
    },
    value: {
      String,
      default: ''
    }
  }
};
</script>

<style scoped>

</style>
