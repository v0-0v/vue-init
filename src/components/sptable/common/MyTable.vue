<template>
  <div class="my-table">
    <el-table :data="data" :span-method="objectSpanMethod">
      <my-column v-for="(item,index) in col" :key="index" :col="item"></my-column>
    </el-table>
  </div>
</template>

<script>
import MyColumn from './MyColumn';

export default {
  props: {
    col: {
      type: Array
    },
    data: {
      type: Array
    },
    objectSpanMethod: {
      type: Function
    }
  },
  components: {
    MyColumn
  }
};
</script>
<style scoped>
</style>
