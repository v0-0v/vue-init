<template>
  <div class="componentContainer" ref="componentContainer">
    <el-row>
      <el-col :xs="24" :sm="24" :md="12"
              :lg="8"
              :xl="8"
              v-for="(item, index) in componentList"
              :key="index" class="component-Box" :style="{ height: componentBoxWidth * 4 / 2.25 + 'px'}">
        <el-card shadow="hover" style="height: 100%">
          <div slot="header" class="clearfix">
            <span class="name" v-if="item.name">{{item.name}}</span>
            <span class="name" v-else></span>
            <el-button class="edit-btn" style="float: right; padding: 3px 0" type="text" icon="el-icon-edit-outline" @click="selectComponent(index+1,item.containerId)"></el-button>
          </div>
          <component
            :height="componentBoxWidth * 4 / 2.25 - 30 + 'px'"
            :is="item.component"
            :id="'chart' + index"
            v-if="item.component"
            width="100%"
          ></component>
          <!--<bar-chart :height="componentBoxWidth * 4 / 2.25 - 40 + 'px'" width="100%"  id="chart3" :barxAxisData="barAxisData" :barSeriesData="barSeriesData" ></bar-chart>-->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import pieChart from './comm/pieChart';
import barChart from './comm/barChart';

export default {
  name: 'componentBox',
  components: {
    pieChart,
    barChart
  },
  props: {
    componentList: {
      type: Array
    }
  },
  data() {
    return {
      componentBoxWidth: '180'
    };
  },
  computed: {},
  methods: {
    selectComponent(order, componentId) { // 选择组件
      this.$emit('getResourceData', {
        order,
        componentId
      });
    },
    count(index) {
      switch (index) {
        case 0:
          return 24;
        case 1:
          return 14;
        case 2:
          return 10;
        case 3:
          return 14;
        case 4:
          return 10;
        case 5:
          return 14;
        case 6:
          return 10;
        case 7:
          return 10;
        case 8:
          return 14;
        default:
          return 0;
      }
    }
  }
};
</script>
<style lang="scss">
.componentContainer {
  width: 100%;
  margin-bottom: 60px;

  .component-Box {
    padding: 5px;

    .el-card {
      overflow: hidden;
      position: relative;

      .el-card__header {
        z-index: 1111 !important;
        background: #009af8;
        width: 100%;
        opacity: 0.7;
        padding: 0 !important;
        height: 50px;
        line-height: 50px;
        display: block;
        color: white;
        transition: 1s;
        position: absolute;
        top: -100px;
        border-radius: 100px;

        .name {
          margin-left: 15px;
        }

        .edit-btn {
          cursor: pointer;
          color: white;
          height: 50px;
          margin-right: 15px;
        }
      }
    }

    .el-card:hover .el-card__header {
      border-radius: 0;
      top: 0;
    }
  }
}
</style>
