<template>
  <div class="line-m-ts"
       :style="{height: `calc(${rows*20}px + ${rows - 1 }px)`}">
    <div v-if="value" class="flex-column" v-ftitle>{{value}}</div>
    <div v-else class="flex-column">
      <slot></slot>
    </div>
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
    rows: {
      Number,
      default: 1
    }
  }
};
</script>
<style scoped>

</style>
