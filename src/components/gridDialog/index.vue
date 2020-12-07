<template>
  <Dialog :title="title" :width="800" :height="600" :visible="dialogVisible" @close="handleClose">
    <div class="grid-contain">
      <div class="grid-table" v-loading="loading">
        <sp-table
          ref="gridTable"
          :parentTableData.sync="tableData"
          :parentCol.sync="gridConfigCopy"
          :dragDrop='true'
          height="100%"
          @selection-change="handleSelectionChange"
          @getDetail="handleOk"
          :key-dom=1
        >
          <el-table-column align="center" type="selection" class="selection"></el-table-column>
          <el-table-column align="center" type="index" width="50" />
          <sp-table-column :align="item.alignment" v-for="(item, index) in gridConfig" :key="index" :width="item.width"
                             sortable
                             :prop="gridConfig[index].field"
          >
            <template slot="header">
              <p>{{item.title}}</p>
            </template>
            <template v-slot="{ scope }">
              <div class="span">
                {{scope.row[gridConfig[index].field]}}
              </div>
            </template>
          </sp-table-column>
        </sp-table>
      </div>
    </div>
    <div slot="footer" style="width:100%;text-align: right">
      <el-button size="small" icon="el-hg-icon-save" type="primary" @click="handleOk">选 择</el-button>
      <el-button size="small" icon="el-hg-icon-close" type="danger" @click="handleClose">关 闭</el-button>
    </div>
  </Dialog>
</template>
<script>
import { mapGetters } from 'vuex';
import Dialog from '@/components/dialog';
import { spTable, spTableColumn } from '@/components/sptable';

export default {
  components: {
    Dialog,
    spTable,
    spTableColumn
  },
  props: {
    gridConfig: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    defaultValues: [Object, String, Array], // 对应关系： 选择数据组的key值:保存为的key值
    defaultKeys: [Object, String, Array], // 用来检测勾选状态的参数
    refValue: {
      type: Object,
      default: () => {}
    },
    refList: {
      type: Array,
      default: () => []
    },
    refListIndex: Number,
    col: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: '弹出框'
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters({
      userInfor: 'user/userInfor'
    })
  },
  data() {
    return {
      dialogVisible: this.show,
      inputVal: '',
      loading: false,
      selectList: [],
      params: {},
      gridConfigCopy: []
    };
  },
  watch: {
    show(val) {
      this.dialogVisible = !!val;
      if (val) {
        this.$nextTick(() => {
          this.init();
          this.$refs.gridTable.initTable();
        });
      }
    },
    /* eslint-disable no-unused-vars */
    gridConfig(val) {
      this.initCol();
    },
    gridConfigCopy() {
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    }
  },
  methods: {
    initCol() {
      this.gridConfig.length > 0
      && (this.gridConfigCopy = this.gridConfig.map(itme => {
        let info = itme;
        info.field = itme.field;
        info.title = itme.title;
        if (itme.width) {
          info.width = itme.width;
        }
        return info;
      })
      );
    },
    init() {
      this.selectList = this.tableData.filter(ref => this.defaultValues[this.defaultKeys] && this.refValue[this.defaultValues[this.defaultKeys]] && ref[this.defaultKeys] && ref[this.defaultKeys] === this.refValue[this.defaultValues[this.defaultKeys]]);
      this.$refs.gridTable.initSelect(this.selectList);
    },
    // 选中列数据
    selectData() {
    },
    // dialog 关闭
    handleClose() {
      this.$emit('close', false);
    },
    // 分页
    pageChange(val) {
      this.$emit('page', val);
    },
    handleOk() {
      console.log('回写数据====>开始', this.selectList);
      let refValue = {};
      this.selectList.forEach(select => {
        Object.keys(this.defaultValues).forEach(key => {
          refValue[this.defaultValues[key]] = select[key];
        });
      });
      console.log(this.refList);
      if (this.refList.length > 0) {
        const refList = JSON.parse(JSON.stringify(this.refList));
        Object.assign(refList[this.refListIndex], refValue);
        // refList[this.refListIndex] = refValue;
        this.$emit('update:refList', refList);
      }
      else {
        this.$emit('update:refValue', Object.assign({}, this.refValue, refValue));
      }
      this.$emit('close', false);
      console.log('回写数据====>结束', refValue);
    },
    handleSelectionChange(val) {
      this.selectList = val;
    }
  }
};
</script>
<style lang="scss">
.grid-contain {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  .operation {
    margin-bottom: 20px;
    padding-left: 20px;

    .el-form-item__label {
      line-height: 32px;
    }
    .el-form-item__content {
      vertical-align: sub;
    }
  }

  .gdConent-input {
    width: 200px;
  }

  .grid-table {
    flex: 1;
    overflow: hidden;
  }
}
.selectBtn {
  margin-top: 5px;
  vertical-align: text-top;
}
</style>
