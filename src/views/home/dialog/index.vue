<template>
  <div class="dialog">
    <hg-dialog :title="title" :width="800" :height="600" :visible="dialogVisible" @close="handleClose">
      <!-- <Content ref="alertChild"></Content> -->
      <div class="impDataCloudDetail">
        <sp-table ref="spTable" :parentTableData.sync="tData" :parentCol.sync="colList" @selection-change="handleSelectionChange" :dragDrop="true" width="100%" v-if="tData.length>0">
          <el-table-column type="selection" width="55" class-name="index"></el-table-column>
          <!-- <el-table-column type="selection" width="55" class-name="index"></el-table-column> -->
          <el-table-column label="序号" align="center" prop="index" type="index" width="60" class-name="index"></el-table-column>
          <sp-table-column v-for="(item, index) in colList" :key="`col_${index}`" :min-width="item.width" sortable :prop="colList[index].field">
            <template slot="header">
              <p>{{item.title}}</p>
            </template>
            <template v-slot="{ scope }">
              <div class="span">
                <!-- <el-input v-model="scope.row[colList[index].field]" v-if="isEdit&&item.title!=='区域'&&scope.row.checked===true" @onmouseover="getTip" @blur="handleBlur($event,scope.$index,colList[index].field)" :class="{'error':isError(scope.row[colList[index].field])}"></el-input>
                <span v-else>{{scope.row[colList[index].field]}}</span> -->
                <el-select v-model="scope.row[colList[index].field]" placeholder="请选择" v-if="item.title === '图表类型'">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <span v-else>{{scope.row[colList[index].field]}}</span>
              </div>
            </template>
          </sp-table-column>
        </sp-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginObj.currentPage" :page-sizes="paginObj['sizes']" :page-size="paginObj['size']" layout="total, sizes, prev, pager, next, jumper" :total="paginObj['total']">
        </el-pagination>
      </div>
      <div slot="footer" style="width:100%;text-align: right">
        <el-button size="small" icon="el-hg-icon-save" type="primary" @click="onSubmit">确定</el-button>
        <el-button size="small" icon="el-hg-icon-close" type="danger" @click="handleClose">关闭</el-button>
      </div>
    </hg-dialog>
  </div>
</template>
<script>
import HgDialog from '@/components/dialog';
// import Content from './content';
import { spTable, spTableColumn } from '@/components/sptable';

export default {
  name: 'impHgDialog',
  components: {
    HgDialog,
    // Content,
    spTable,
    spTableColumn
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // this.getListIndexConf();
  },
  data() {
    return {
      ss: '',
      options: [{
        value: 'pie',
        label: '饼图'
      }, {
        value: 'line',
        label: '曲线图'
      }, {
        value: 'bar',
        label: '柱状图'
      }],
      dialogVisible: false,
      title: '可添加的图表',
      pamas: {
        name: '',
        date: ''
      },
      // tData: [{ creatDateRemark: '婚姻家庭邻里关系', echartType: 'pie', typeCode: 'A01-1' }, { creatDateRemark: '民众纠纷', echartType: 'line' }, { creatDateRemark: '劳资纠纷', echartType: 'bar' }, { creatDateRemark: '经济纠纷', echartType: 'bar' }, { creatDateRemark: '环境污染,生态破坏', echartType: 'bar' }],
      tData: [],
      colList: [
        {
          field: 'creatDateRemark',
          title: '图表名称',
          width: 100
        },
        {
          field: 'echartType',
          title: '图表类型',
          width: 100
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
    createFilter1(a) {
      return tableData => {
        // 这里有一个坑，你如果更改value属性名称代码不报错，结果将无法筛选，永远为空，尝试了多次没有成功，用原生处理筛选，直接赋值cb的参数都不行，一定要属性值为value
        let v = false;
        if (tableData.value.indexOf(a) !== -1) {
          v = true;
        }
        if (tableData.hao.indexOf(a) !== -1) {
          v = true;
        }
        if (tableData.address.indexOf(a) !== -1) {
          v = true;
        }
        return v;
      };
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
        this.querysaveIndexConf();
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
      this.getListIndexConf();
    },
    handleCurrentChange(currentPage) {
      this.paginObj['currentPage'] = currentPage;
      this.getListIndexConf();
    },
    getListIndexConf() {
      let params = {
        currentPage: this.paginObj.currentPage,
        pageSize: this.paginObj.size
      };
      this.indexConf(params);
    },
    // 可添加图表的列表
    async indexConf(params) {
      const { status, bean } = await this.$services.post({
        type: 'GRIDPKSET',
        url: 'indexConf',
        params
      });
      if (status) {
        if (bean.list && bean.list.length > 0) {
          this.tData = bean.list;
          this.paginObj.total = bean.total;
        }
      }
    },
    /**
    *可添加图表的列表的保存
    */
    querysaveIndexConf() {
      console.log('保存', this.selectArrys);
      let params = {
        typeCode: this.selectArrys[0]['typeCode'],
        echartType: this.selectArrys[0]['echartType']
      };
      this.saveIndexConf(params);
    },
    async saveIndexConf(params) {
      const { status } = await this.$services.post({
        type: 'GRIDPKSET',
        url: 'saveIndexConf',
        params
      });
      if (status) {

      }
    }
  },
  // dialog show
  watch: {
    show(val) {
      console.log('观察show的变化', val);
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
