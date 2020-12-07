<template>
  <div class="demo">
    <h1>开发规范</h1>
    <div>
      <hg-button></hg-button>
    </div>
    <div>
      <hg-icon></hg-icon>
    </div>
  </div>
</template>

<script>
import Button from './button';
import Icon from './icon';

export default {
  name: 'demo',
  components: {
    'hg-button': Button,
    'hg-icon': Icon
  }
};
</script>

<style lang="scss" scoped>
.demo {
  padding: 20px;
}
</style>
