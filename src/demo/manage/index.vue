<template>
  <div class="home standing">
    <h2>数据管理页面demo</h2>
    <div class="standing-bar">
      <search></search>
      <el-row>
        <el-button type="primary" @click="showDialog">打开弹窗</el-button>
      </el-row>
    </div>
    <list :dataList="dataList" class="list-view"></list>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginObj.currentPage" :page-sizes="paginObj['sizes']" :page-size="paginObj['size']" layout="total, sizes, prev, pager, next, jumper" :total="paginObj['total']">
    </el-pagination>
    <!-- 弹窗 -->
    <my-dialog :show="isDialog" @submit="submitDialog" @close="closeDialog"></my-dialog>
  </div>
</template>

<script>
import MyDialog from './dialog/index';
import search from './search';
import list from './list';

export default {
  name: 'home',
  components: {
    MyDialog,
    search,
    list
  },
  data() {
    return {
      isDialog: false,
      dataList: [],
      paginObj: {
        currentPage: 1,
        sizes: [10, 20, 40, 60, 80],
        size: 6,
        total: 0
      },
    };
  },
  mounted() {
    // this.getList();
    this.dataList = [
      {
        name: 'test'
      }
    ];
  },
  methods: {
    getList() {},
    showDialog() {
      this.isDialog = true;
    },
    // 关闭弹窗
    closeDialog() {
      this.isDialog = false;
    },
    // 关闭弹窗并提交
    submitDialog(select) {
    },
    handleSizeChange(size) {
      this.paginObj['size'] = size;
      this.getList();
    },
    handleCurrentChange(currentPage) {
      this.paginObj['currentPage'] = currentPage;
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
