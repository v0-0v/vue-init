<template>
  <div>
    <el-table
      class="table-list"
      ref="multipleTable"
      :data="dataList"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column v-for="(th,index) in colList" :key="index" :prop="th.name" :label="th.label"></el-table-column>
      <el-table-column label="操作" prop="selected" width="100px">
        <el-button size="small" type="danger">删除</el-button>
      </el-table-column>
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
  }
};
</script>
<style lang="scss" scoped>
</style>
