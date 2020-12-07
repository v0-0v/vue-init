export default {
  name: 'tableRowClick',
  methods: {
    clickFn(row) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    dblclickFn(row) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(row);
      this.$emit('detail');
    }
  }
};
