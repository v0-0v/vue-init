<template>
  <div class="createOption">
    <div v-loading="isShow" :id="id" style="width:100%;height:100%" v-if="isShowList"></div>
    <scroll-list v-if="!isShowList"></scroll-list>
  </div>
</template>
<script>
import echarts from 'echarts';
import pie from './pie.js';
import line from './line.js';
import bar from './bar.js';
import scrollList from '../components/scollList.vue';

export default {
  name: 'createOption',
  data() {
    return {
      myChart: {},
      isShow: true,
      isShowList: true,
      eventaData: [],
      eventHandlePie: { // 饼图处理后的数据
        legendData: [],
        seriesData: [],
        selected: {},
        titleName: ''
      },
      eventHandleLine: { // 曲线图处理后的数据
        xAxisData: [],
        seriesData: [],
        titleName: ''
      },
      eventHandleBar: { // 柱状图处理后的数据
        xAxisData: [],
        seriesData: [],
        titleName: ''
      }
    };
  },
  components: {
    scrollList
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    typeCode: {
      type: String,
      default: ''
    },
    echartType: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  watch: {
    typeCode: {
      immediate: true,
      handler(val) {
        console.log('111子页面接受到的数据类型', val);
        if (val) {
          this.getEventNumByType(val);
        }
        else {
          // 空值时显示今日关键事件详情
          this.isShow = false;
          this.isShowList = false;
        }
      }
    }
  },
  activated() {
    // eslint-disable-next-line no-irregular-whitespace
    this.$nextTick(() => {
      // eslint-disable-next-line no-irregular-whitespace
      let myEvent = new Event('resize');
      window.dispatchEvent(myEvent);
    });
  },
  methods: {
    // 昨日各关键事件类型区域分布
    async getEventNumByType(code) {
      const { status, bean } = await this.$services.post({
        type: 'HOME',
        url: 'getEventNumByType',
        params: {
          typeId: code
        }
      });
      if (status) {
        if (bean && bean.length > 0) {
          this.eventaData = bean;
          console.log('类型--', this.echartType);
          if (this.echartType === 'bar') {
            this.handleBar(this.eventaData);
          }
          else if (this.echartType === 'pie') {
            this.handlePie(this.eventaData);
          }
          else if (this.echartType === 'line') {
            this.handleLine(this.eventaData);
          }
        }
        this.createE();
      }
    },
    createE() {
      // console.log('ID', this.id);
      if (!document.getElementById(this.id)) {
        return;
      }
      this.myChart[this.id] = echarts.init(document.getElementById(this.id));
      let option = {};
      // console.log('类型', this.echartType);
      if (this.echartType === 'bar') {
        option = bar;
        option.xAxis[0]['data'] = this.eventHandleBar.xAxisData;
        option.series[0]['data'] = this.eventHandleBar.seriesData;
      }
      else if (this.echartType === 'pie') {
        option = pie;
        option.legend['data'] = this.eventHandlePie.legendData;
        option.series[0]['data'] = this.eventHandlePie.seriesData;
        option.legend.selected = this.eventHandlePie.selected;
      }
      else if (this.echartType === 'line') {
        option = line;
        option.xAxis['data'] = this.eventHandleLine.xAxisData;
        option.series[0]['data'] = this.eventHandleLine.seriesData;
      }
      option.title.text = this.title;
      console.log(this.eventHandleLine.xAxisData.length, this.myChart);
      this.myChart[this.id].setOption(option);
      this.isShow = false;
      setTimeout(() => {
        this.myChart[this.id].resize();
      }, 10);
      window.addEventListener('resize', () => {
        this.myChart[this.id].resize();
      });
    },
    handlePie(data) {
      console.log('pie', data);
      let name = '';
      for (let i = 0; i < data.length; i++) {
        name = data[i]['orgName'];
        this.eventHandlePie.legendData.push({
          name,
          icon: 'rect'
        });
        this.eventHandlePie.seriesData.push({
          name,
          value: data[i]['eventNum'],
          date: data[i]['occurDate']
        });
        if (i <= 6) {
          this.eventHandlePie.selected[name] = true;
        }
        else {
          this.eventHandlePie.selected[name] = false;
        }
      }
    },
    handleLine(data) {
      console.log('line', data);
      let obj = {};
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (!obj[item['occurDate']]) {
          obj[item['occurDate']] = item['eventNum'];
        }
        else {
          obj[item['occurDate']] += item['eventNum'];
        }
      }
      console.log('obj--===', obj);
      // eslint-disable-next-line guard-for-in
      for (let key in obj) {
        this.eventHandleLine.xAxisData.push(key);
        this.eventHandleLine.seriesData.push({
          value: obj[key],
          date: key
        });
      }
      console.log('lineline--===', this.eventHandleLine);
    },
    handleBar(data) {
      console.log('bar', data);
      let obj = {};
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (!obj[item['orgName']]) {
          obj[item['orgName']] = item['eventNum'];
        }
        else {
          obj[item['orgName']] += item['eventNum'];
        }
      }
      // eslint-disable-next-line guard-for-in
      for (let key in obj) {
        this.eventHandleBar.xAxisData.push(key);
        this.eventHandleBar.seriesData.push({
          value: obj[key],
          date: key
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.createOption {
  width: 100%;
  height: 100%;
}
</style>
