export default {
  name: 'zycComm',
  data() {
    return {
      bShowDialog: false,
      currentId: null,
      dialogType: '',
      loading: true,
      queryParams: {
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        currentPage: 1
      }
    };
  },
  methods: {
    /**
       * paginations fun
       */
    startLoading() {
      this.loading = true;
    },
    stopLoading() {
      this.loading = false;
    },
    handleSizeChange(size) {
      console.warn('wguy2');
      this.queryParams.pageSize = size;
      this.refresh(); // 在组件上声明该函数
    },
    handleCurrentChange(currentPage) {
      console.warn('wguy');
      this.queryParams.currentPage = currentPage;
      this.refresh();
    },
    clearChecked() {
      console.warn('clear checked!');
      // console.log(this.$refs);
      // table ref
      this.$refs['tableList'].$refs['multipleTable'].clearSelection();
    },
    /**
       * dialog fun
       */
    closeDialog() {
      this.bShowDialog = false;
      this.clearChecked();
    },
    showDialog(dialogType) {
      this.dialogType = dialogType;
      this.bShowDialog = true;
    },
    insert() {
      this.currentId = null;
      this.showDialog('insert');
    },
    update() {
      let checkedArrys = this.getCheckItems();

      if (checkedArrys.length > 0) {
        this.currentId = checkedArrys[0].value;
        this.showDialog('update');
      }
      else {
        this.$message({
          type: 'info',
          message: '请先选择一条数据再进行该操作！'
        });
      }
    },
    detail() {
      let checkedArrys = this.getCheckItems();

      if (checkedArrys.length > 0) {
        this.currentId = checkedArrys[0].value;
        this.showDialog('detail');
      }
      else {
        this.$message({
          type: 'info',
          message: '请先选择一条数据再进行该操作！'
        });
      }
    },
    /**
     * get checked
     */
    getCheckItems() {
      let ids = [];
      for (let i = 0; i < this.aDataList.length; i++) {
        let item = this.aDataList[i];
        if (item.checked) {
          ids.push({
            value: item.id
          });
        }
      }
      return ids;
    }
  }
};
