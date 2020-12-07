<template>
  <div class="search">
    <div class="operation-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss">
.search {
  min-height: 80px;
  padding: 10px 0;

  p {
    border-bottom: 1px solid #F3F3F3;
    padding-bottom: 10px;
  }

  .search-line {
    margin-top: 10px;

  }
}
</style>
