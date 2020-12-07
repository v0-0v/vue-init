<template>
  <div class="arow-t">
    <column-left v-if="value" :value="value" :rows="rows"/>
    <slot name="auto"></slot>
    <div class="line-m-tt" :style="{width: `calc(100% - ${calcWidth}px)`}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import columnLeft from './column';

export default {
  name: 'baseColumn',
  props: {
    rows: {
      Number,
      default: 0
    },
    value: {
      String,
      default: ''
    },
    calcWidth: {
      Number,
      default: 51
    }
  },
  components: {
    columnLeft
  }
};
</script>

<style scoped>

</style>
