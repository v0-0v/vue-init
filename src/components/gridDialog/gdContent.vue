<template>
  <div>
    <sp-table
      :parentTableData.sync="tableData"
      :parentCol.sync="col"
      :dragDrop="true"
      @addNewData="addColData"
      @selection-change="licenseNumberSelectionChange"
    >
      <el-table-column type="selection" class="selection"></el-table-column>
      <sp-table-column v-for="(item, index) in col" :key="index">
        <template slot="header">
          {{item.title}}
        </template>
      </sp-table-column>
    </sp-table>
  </div>
</template>
<script>
import { spTable, spTableColumn } from '@/components/sptable';
// import pageModle from '@/views/comm/pagination';

export default {
  components: {
    spTable,
    spTableColumn
    // pageModle
  },
  props: ['col', 'tableData'],
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 400
      }
    };
  },
  methods: {
    // 选中更新
    licenseNumberSelectionChange(val) {
      this.$emit('assignment', val);
    },
    // page翻页回调
    currentChange(val) {
      this.page.currentPage = val;
      this.$emit('page', this.page);
    },
    // 每页显示数据内容变化
    sizeChange(val) {
      this.page.pageSize = val;
      this.$emit('page', this.page);
    },
    addColData() {

    }
  }
};
</script>
<style lang="scss" scoped>
</style>
