/** 2018/12/22
*作者:Cookie
*功能: 侧边栏菜单
*/

<template>
  <div class="left_menu">
    <Menu/>
  </div>
</template>

<script>
import Menu from 'views/comm/menu';

export default {
  name: 'leftMenu',
  components: {
    Menu
  },
  data() {
    return {};
  }
};
</script>

<style>
.left_menu{
  height           : 100%;
  background-color : #2B2F32;
}
</style>
