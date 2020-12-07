<template>
  <div class="line-h-h" :style="{width:`calc(${line} * 40px)`,height: `${height}px` }">
    <div class="line-h-h-ts" :style="{height: `${height}px`}">
      <div class="line-h-h-tst" :style="{width: `${width}px`}">
        <div v-if="value" class="flex-column" v-ftitle>{{value}}</div>
        <div v-else class="flex-column">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'baseTile',
  props: {
    value: {
      String,
      default: ''
    },
    height: {
      Number,
      default: 120
    },
    width: {
      Number,
      default: 40
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
