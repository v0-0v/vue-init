<template>
  <hg-dialog :title="title" :width="800" :height="600" :visible="dialogVisible" @close="handleClose">
    <div class="impDataCloudDetail">
      <el-table
        class="table-list"
        ref="multipleTable"
        :data="tData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column v-for="(th,index) in colList" :key="index" :prop="th.name" :label="th.label"></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginObj.currentPage" :page-sizes="paginObj['sizes']" :page-size="paginObj['size']" layout="total, sizes, prev, pager, next, jumper" :total="paginObj['total']">
      </el-pagination>
    </div>
    <div slot="footer" style="width:100%;text-align: right">
      <el-button size="small" icon="el-hg-icon-save" type="primary" @click="onSubmit">确定</el-button>
      <el-button size="small" icon="el-hg-icon-close" type="danger" @click="handleClose">关闭</el-button>
    </div>
  </hg-dialog>
</template>
<script>
import HgDialog from '@/components/dialog';

export default {
  name: 'impHgDialog',
  components: {
    HgDialog
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // this.getList();
  },
  data() {
    return {
      dialogVisible: false,
      title: '可添加的图表',
      pamas: {
        name: '',
        date: ''
      },
      tData: [
        { name: 'test1' },
        { name: 'test2' }
      ],
      colList: [
        {
          name: 'name',
          label: '标题'
        },
        {
          name: 'compName',
          label: '组件名'
        },
        {
          name: 'type',
          label: '组件类型'
        }
      ],
      paginObj: {
        currentPage: 1,
        sizes: [10, 20, 40, 60, 80],
        size: 6,
        total: 0
      },
      selectArrys: []
    };
  },
  methods: {
    getList() {

    },
    handleSelectionChange(selectArrys) { // 获取table选中的项
      for (let i = 0; i < this.tData.length; i++) {
        let item = this.tData[i];
        item.checked = false;
      }
      for (let i = 0; i < selectArrys.length; i++) {
        selectArrys[i].checked = true;
      }
      console.log('已选择的项', selectArrys);
      this.selectArrys = selectArrys;
    },
    handleClose() {
      this.$emit('close');
    },
    onSubmit() {
      if (this.selectArrys.length > 0) {
        this.$emit('submit', this.selectArrys);
      }
      else {
        this.$message({
          type: 'info',
          message: '请先勾选内容!'
        });
      }
    },
    handleSizeChange(size) {
      this.paginObj['size'] = size;
      this.getList();
    },
    handleCurrentChange(currentPage) {
      this.paginObj['currentPage'] = currentPage;
      this.getList();
    }
  },
  // dialog show
  watch: {
    show(val) {
      if (val) {
        this.dialogVisible = true;
      }
      else {
        this.dialogVisible = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
