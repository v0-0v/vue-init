<template>
  <div>
    <el-button @click="instal">测试</el-button>

    <!-- 测试dialog -->
    <!-- title: 标题; col: 列表头; tableDate: table数据; show: dialog显示开关; @page: table分页事件; @select: 搜索按钮事件; @close: dialog关闭事件 -->
    <t-dialog :title="tdialog.title" :col="tdialog.col" :tableData="tdialog.tableData" :show="dialogShow" @page="pageChange" @select="selectChange" @close="tdialogClose"></t-dialog>
  </div>
</template>
<script>
import tDialog from '@/components/gridDialog';

export default {
  components: {
    tDialog
  },
  data() {
    return {
      tdialog: {
        title: '标题,1111',
        col: [
          { field: 'id', title: '序号' },
          { field: 'TankID', title: '罐号' },
          { field: 'SearchCode', title: '产品名称' },
          { field: 'birthday', title: '提单号' },
          { field: 'hobby', title: '铅封号' }
        ],
        tableData: [{
          id: 1,
          TankID: '标题',
          SearchCode: 'sss',
          birthday: 'q21',
          hobby: '421'
        }, {
          id: 2,
          TankID: '标题',
          SearchCode: 'sss',
          birthday: 'q21',
          hobby: '421'
        }, {
          id: 3,
          TankID: '标题',
          SearchCode: 'sss',
          birthday: 'q21',
          hobby: '421'
        }]
      },
      dialogShow: false
    }
  },
  methods: {
    instal() {
      this.dialogShow = true;
    },
    tdialogClose() {
      this.dialogShow = false;
    },
    // 搜索事件
    selectChange(val) {
      console.log(val, 'selectChange')
    },
    // 分页事件
    pageChange(val) {
      console.log(val, 'pageChange')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
