<template>
  <div class="home">
    <component-box @getResourceData="getResourceData" :componentList.sync="componentList"></component-box>
    <resource-select :show="bSelectShow" :resourceList="resourceList" :data="dataList" :order="queryParams.order" :total="total" :currentPage="params.currentPage" :pageSize="params.pageSize" @close="bSelectShow = false" @getResourceData="getResourceData" @refresh="refresh" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></resource-select>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import componentBox from './componentBox';
import resourceSelect from './actions/resource';

export default {
  name: 'home',
  components: {
    componentBox,
    resourceSelect
  },
  data() {
    return {
      bSelectShow: false,
      resourceList: [],
      queryParams: {
        name: '',
        order: 1,
        componentId: ''
      },
      params: {
        pageSize: 10,
        currentPage: 1,
        depCode: '',
        userId: ''
      },
      total: 0,
      selectIndex: 0,
      checkedId: '',
      componentList: [
      ],
      dataList: {
        container1: null,
        container2: null,
        container3: null,
        container4: null,
        container5: null,
        container6: null,
        container7: null,
        container8: null,
        container9: null
      }
    };
  },
  computed: {
    ...mapGetters({
      userInfor: 'user/userInfor',
      userId: 'user/userId'
    })
  },
  methods: {
    getResourceData(params) {
      // 选择资源库
      if (params) {
        Object.assign(this.queryParams, this.queryParams, params);
        if (params.order) this.selectIndex = params.order;
      }
      console.log('params: ', params);
      this.$services
        .post({
          type: 'ECHARTMANGEMENT',
          url: 'getList',
          params: this.params
        })
        .then(res => {
          if (res.code === '000') {
            for (let i = 0; i < res.bean.list.length; i++) {
              let item = res.bean.list[i];
              item.selected = this.dataList['container' + this.selectIndex] === item.id;
              console.log(this.selectIndex, this.dataList, this.dataList['container' + this.selectIndex], item.id);
            }
            this.resourceList = res.bean.list;
            this.total = res.bean.total;
          }
        });
      this.bSelectShow = true;
    },
    async getUserComponentDetail() {
      const res = await this.$services.postLoading({
        type: 'USERMANGEMENT',
        url: 'getUserComponentDetail',
        params: {
          id: this.userId ? this.userId : 'e3525863-23a9-11e9-ac9c-00163e0c1923'
        }
      });
      res.bean && res.bean.length > 0 && res.bean.forEach(k => {
        if (!k) {
          k = {};
        }
      });
      let componentList = [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ];
      res.bean && res.bean.length > 0 && res.bean.forEach((k, index) => {
        componentList[index].option = k;
        if (k === null) {
          componentList[index].option = {};
        }
        else {
          componentList[index].option.loading = true;
          let num = 1 + index;
          this.dataList['container' + num] = componentList[index].option.id;
        }
      });
      let small = document.body.clientWidth < 1600;

      if (componentList.length > 0) {
        componentList.forEach((item, index) => {
          if (small) {
            item.x = index % 2 * 5;
            item.w = 5;
          }
          else {
            item.x = index % 3 * 4;
            item.w = 4;
          }

          item.y = 0;
          item.h = 10;
          item.i = index;
        });
      }
      this.componentList = componentList;
    },
    refresh() {
      this.getUserComponentDetail();
    },
    handleSizeChange(size) {
      this.params.pageSize = size;
      this.getResourceData();
    },
    handleCurrentChange(currentPage) {
      this.params.currentPage = currentPage;
      this.getResourceData();
    }
  },
  created() {
    this.refresh();
  },
  mounted() {
    this.params.depCode = this.userInfor.depCode;
    this.params.userId = this.userId;
  }
};
</script>
<style lang="scss">
.home {
  width: 100%;

  .table-list {
    height: auto !important;
  }
}
</style>
