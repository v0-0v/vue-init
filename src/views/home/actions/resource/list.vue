<template>
  <div>
    <el-table
      class="table-list"
      ref="multipleTable"
      :data="dataList"
      @row-click="handleSelectionChange"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column label="操作" prop="selected" width="100px">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.selected" @change="handleSelectionChange(scope.row)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column v-for="(th,index) in tableTh" :key="index" :prop="th.name" :label="th.label"></el-table-column>
    </el-table>
  </div>
</template>
<script>

export default {
  name: 'list',
  props: {
    dataList: {
      type: Array
    }
  },
  data() {
    return {
      tableTh: [
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
        },
        {
          name: 'statDate1',
          label: '数据展示时间段'
        },
        {
          name: 'createDate',
          label: '创建时间'
        }
      ],
      oActiveItem: null,
      bShowEditDialog: false,
      selectId: ''
    };
  },
  methods: {
    handleSelectionChange(row) {
      if (this.selectId === row.id) {
        this.selectId = '';
        for (let i = 0; i < this.dataList.length; i++) {
          let item = this.dataList[i];
          item.selected = false;
        }
      }
      else {
        for (let i = 0; i < this.dataList.length; i++) {
          let item = this.dataList[i];
          item.selected = false;
          if (item.id === row.id) {
            item.selected = true;
            this.selectId = row.id;
          }
        }
      }
      this.$emit('selectedComponent', {checkedId:this.selectId, data: row});
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
