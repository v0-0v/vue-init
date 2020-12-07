<template>
  <div class="line-h-h-tst" :style="{height: `${height}px`}">
    <div v-if="value" class="flex-column" v-ftitle>{{value}}</div>
    <div v-else class="flex-column">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'simpleColumn',
  props: {
    value: {
      String,
      default: ''
    },
    height: {
      Number,
      default: 100
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
