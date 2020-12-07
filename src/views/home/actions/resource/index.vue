<template>
  <div>
    <hg-dialog
      title="资源库"
      :visible.sync="dialogVisible"
      @close="handleClose"
      :width="800"
      :height="600">
      <!-- search -->
      <!-- <search
        @getResourceList="getResourceData"
      ></search> -->
      <list :dataList.sync="resourceList" @selectedComponent="selectedComponent"/>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      <span slot="footer" class="hg-dialog-footer">
        <el-button type="primary" @click="submit" size="small" icon="el-hg-icon-save">保 存</el-button>
        <el-button @click="handleClose" size="small" icon="el-hg-icon-close">关 闭</el-button>
      </span>
    </hg-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import search from './search';
import list from './list';
import HgDialog from '@/components/dialog';

export default {
  name: 'resource',
  components: {
    list,
    HgDialog
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    resourceList: {
      type: Array
    },
    selectedId: {
      type: String,
      default: ''
    },
    data: {
      type: Object
    },
    order: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      dialogVisible: false,
      checkedId: '',
      checkData: {},
      pageSizes: [10, 20, 50, 100]
    };
  },
  computed: {
    ...mapGetters({
      userId: 'user/userId'
    })
  },
  methods: {
    selectedComponent({ checkedId, data }) {
      this.checkedId = checkedId;
      this.checkData = data;
      console.log(this.checkData);
    },
    submit() {
      this.saveComponent();
    },
    handleSizeChange(size) {
      this.$emit('handleSizeChange', size);
    },
    handleCurrentChange(currentPage) {
      this.$emit('handleCurrentChange', currentPage);
    },
    async saveComponent() {
      let dataA = this.data;
      dataA.userId = this.userId ? this.userId : 'e3525863-23a9-11e9-ac9c-00163e0c1923';
      if (this.checkedId) {
        dataA['container' + this.order] = this.checkedId;
      }
      const res = await this.$services.postJson({
        type: 'USERMANGEMENT',
        url: 'saveUserComponent',
        params: JSON.parse(JSON.stringify(dataA))
      });
      if (res.code === '000') {
        this.$toaster.ok(res.msg);
        this.handleClose();
        this.$emit('refresh');
      }
      else {
        this.$toaster.error(res.msg);
      }
    },
    getResourceData(params) {
      this.$emit('getResourceData', params);
    },
    handleClose() {
      this.dialogVisible = false;
      this.$emit('close');
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.dialogVisible = true;
      }
    }
  }
};
</script>
<style lang="scss">
</style>
