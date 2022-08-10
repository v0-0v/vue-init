<template>
  <div>
    <hg-dialog :title="'数据echart保存'" :width="800" :height="400" :visible="dialogVisible" @close="handleClose">
      <div v-loading="loading">
        <el-form :inline="true" ref="ruleForm" label-width="170px" class="echartSave-form">
          <el-form-item label="数据展示时间段">
            <el-select v-model="statDate" placeholder="请选择">
              <el-option v-for="(item, index) in insideTimeList" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" style="width:100%;text-align: right">
        <el-button size="small" icon="el-hg-icon-save" type="primary" @click="submit">保 存</el-button>
        <el-button size="small" icon="el-hg-icon-close" type="danger" @click="handleClose">关 闭</el-button>
      </div>
    </hg-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HgDialog from '@/components/dialog';

export default {
  name: 'MyDialog',
  components: {
    HgDialog
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      statDate: '1102AB7FC7684C339B7176BD81CED11C',
      insideTimeList: []
    };
  },
  methods: {
    ...mapGetters({
      userInfor: 'user/userInfor'
    }),
    async getInsideTime() {
      const { bean } = await this.$services.post({
        type: 'ASSESS_FORECAST',
        url: 'getInsideTime',
        params: {
          depCode: this.userInfor().depCode
        }
      });
      bean.forEach(val => {
        this.insideTimeList.push({
          value: val.id,
          label: val.dicName
        });
      });
    },
    submit() {
      this.$emit('toSave', this.statDate);
      this.dialogVisible = false;
      this.$emit('close');
    },
    handleClose() {
      this.$confirm('是否不保存离开', '提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.dialogVisible = false;
          this.$emit('close');
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消关闭'
          });
        });
    }
  },
  mounted() {
    this.getInsideTime();
  },
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

<style lang="scss">
.echartSave-form {
    margin: 0 auto;
    text-align: center;
    .el-input,
    .el-select,
    .el-cascader {
      width: 250px;
      height: 32px;

      input {
        height: 32px;
      }
    }

    .el-textarea {
      width: 250px;
    }
    .el-select .el-input__inner{
      width: 250px;
    }
    .el-form-item{
      background: transparent!important;
    }
  }
</style>
