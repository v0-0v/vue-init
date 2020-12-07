<script>
export default {
  beforeCreate() {
    const { params, query } = this.$route;
    const { path } = params;
    console.log('****************', params);
    if (!path) {
      this.$router.replace({
        path: '/',
        query
      });
    }
    else {
      this.$router.replace({
        path: '/' + path,
        query
      });
    }

  },
  render(h) {
    return h(); // avoid warning message
  }
};
</script>
