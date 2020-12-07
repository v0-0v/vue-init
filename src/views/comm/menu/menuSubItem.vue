<template>
  <el-submenu :index="item.code" >
    <template slot="title">
      <!-- <i v-if="item.icon" :class="item.icon"></i> -->
      <svg class="myIconStyle" aria-hidden="true">
        <use :xlink:href="'#' + item.icon"></use>
      </svg>
      <span slot="title">{{item.name}}</span>
    </template>
    <el-menu-item-group>
      <slot></slot>
    </el-menu-item-group>
  </el-submenu>
</template>

<script>
export default {
  name: 'menuSubItem',
  props: {
    item: {
      Object,
      default: {
        id: '',
        name: '',
        icon: ''
      }
    }
  }
};
</script>

<style scoped>
.myIconStyle {
  width: 20px;
  height: 20px;
  fill: currentColor;
  overflow: hidden;
  color: #909399;
  margin-right: 5px;
}
</style>
