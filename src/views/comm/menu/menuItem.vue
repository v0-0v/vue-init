<template>
  <el-menu-item v-if="item.showMenu!==false" :index="item.code" @click.native="goPage(item.id)">
    <i v-if="item.icon" :class="item.icon"></i>
    <span slot="title">{{item.name}}</span>
  </el-menu-item>
</template>

<script>

export default {
  name: 'menuItem',
  props: {
    item: {
      Object,
      default: {
        id: '',
        name: '',
        icon: ''
      }
    }
  },
  data() {
    return {
      queryParams: {
        ids: [
          { value: 'cd36f491-1fc6-11e9-ac9c-00163e0c1923' }
        ],
        functionId: ''
      }
    };
  },
  methods: {
    goPage() {
      this.$router.push(this.item.path);
    }
  }
};
</script>

<style scoped>
</style>
