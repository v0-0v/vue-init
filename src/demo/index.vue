<template>
  <div class="demo">
    <div>
      <h1>开发规范</h1>
      <div>
        <hg-button></hg-button>
      </div>
      <div>
        <hg-icon></hg-icon>
      </div>
      <div>
        <hg-manage></hg-manage>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './button';
import Icon from './icon';
import Manage from './manage';

export default {
  name: 'demo',
  components: {
    'hg-button': Button,
    'hg-icon': Icon,
    'hg-manage': Manage
  }
};
</script>

<style lang="scss" scoped>
.demo {
  padding: 20px;
  height: calc(100% - 40px);
  overflow-y: auto;
}
</style>
