<template>
  <div class="templateConter">
    <el-tag v-if="start === 'tag'" :type="typeInfo">
      <slot></slot>
    </el-tag>
    <el-checkbox v-if="start === 'checkbox'" :disabled="true" :checked="font"></el-checkbox>
  </div>
</template>
<script>
export default {
  props: {
    font: {
      request: true
    },
    start: String,
    typeInfo: {
      request: true
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #409EFF;
  border-color: #409EFF;
}

.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: #ffffff;
}
</style>
