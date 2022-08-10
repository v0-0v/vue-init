<template>
  <div class="page-box">
    <div class="echartBox" :id="'page' + id"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
import echartsType from './options';

export default {
  name: 'echartBox',
  props: {
    id: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      echart: null,
      echartOption: {},
      echartObj: {},
      dataAll: [],
      statX: [],
      statY: [],
      statOptions: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    async init() {
      Promise.all([
        this.getStatOptions(),
        this.getDataAll()
      ]).then(result => {
        this.statOptions = result[0].bean;
        this.dataAll = result[1].bean;
        this.statX = [];
        this.statY = [];
        this.config.statList.length > 0 && this.config.statList.forEach(() => {
          this.statY.push([]);
        });
        console.log(this.dataAll);
        this.dataAll.length > 0 && this.dataAll.forEach(k => {
          this.statX.push(k[this.config.statName]);
          this.config.statList.length > 0 && this.config.statList.forEach((s, i) => {
            if (isNaN(k[s.statValue])) {
              this.statY[i].push(k[s.statValue].indexOf('%') === -1 ? k[s.statValue].indexOf('%') : k[s.statValue].split('%')[0] / 100);
            }
            else {
              this.statY[i].push(k[s.statValue]);
            }
          });
        });
        this.echartOption = this.$utils.deepCopy(echartsType.DEFAULT);
        this.config.statList.length > 0 && this.config.statList.forEach((k, i) => {
          switch (k.echartType) {
            case 'line':
              this.setLineData(i);
              break;
            case 'bar':
              this.setBarData(i);
              break;
            case 'pie':
              this.echartOption = this.$utils.deepCopy(echartsType.PIE);
              this.setPieData(i);
              break;
            default: this.echartOption = echartsType.LINE;
          }
        });
      });
    },
    getStatOptions() {
      return this.$services.post({
        type: 'PAGESOURCE',
        url: 'getSourceColumn',
        params: {
          source: this.config.echartData
        }
      });
    },
    getDataAll() {
      let beginDate = this.config.echartDate[0];
      let endDate = this.config.echartDate[1];
      if (this.config.echartDateMove) {
        let res = this.getPeriod(this.config.echartDate);
        ({ beginDate } = res);
        ({ endDate } = res);
      }
      return this.$services.post({
        type: 'PAGESOURCE',
        url: 'getDataBySource',
        params: {
          source: this.config.echartData,
          beginDate,
          endDate,
          orgId: this.config.ids[this.config.ids.length - 1]
        }
      });
    },
    getPeriod(monthArr) {
      let beginYear = monthArr[0].split('-')[0];
      let beginMonth = monthArr[0].split('-')[1];
      let endYear = monthArr[1].split('-')[0];
      let endMonth = monthArr[1].split('-')[1];
      let period = (endYear - beginYear) * 12 + (endMonth - beginMonth);
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let year2 = year;
      let month2 = parseInt(month, 10) - period;
      if (month2 <= 0) {
        year2 = parseInt(year2, 10) - parseInt(month2 / 12 === 0 ? 1 : Math.abs(parseInt(month2 / 12, 10)) + 1, 10);
        month2 = 12 - (Math.abs(month2) % 12);
      }
      let res = {
        beginDate: year2 + '-' + month2,
        endDate: year + '-' + month
      };
      return res;
    },
    setLineData(index) {
      this.echartOption.title.text = this.config.title;
      this.echartOption.xAxis[0].data = this.statX;
      let nameObj = this.statOptions.find(k => k.columnName === this.config.statList[index].statValue);
      this.echartOption.series.push({
        name: nameObj.columnComment,
        type: 'line',
        data: this.statY[index],
        yAxisIndex: 1
      });
      this.initEchart(this.echart, 'page' + this.id, this.echartOption);
    },
    setBarData(index) {
      this.echartOption.title.text = this.config.title;
      this.echartOption.xAxis[0].data = this.statX;
      let nameObj = this.statOptions.find(k => k.columnName === this.config.statList[index].statValue);
      this.echartOption.series.push({
        name: nameObj.columnComment,
        type: 'bar',
        data: this.statY[index]
      });
      this.initEchart(this.echart, 'page' + this.id, this.echartOption);
    },
    setPieData(index) {
      this.echartOption.title.text = this.config.title;
      let nameObj = this.statOptions.find(k => k.columnName === this.config.statList[index].statValue);
      let serviesData = [];
      this.statX.length > 0 && this.statX.forEach((k, i) => {
        serviesData.push({
          value: this.statY[index][i],
          name: k
        });
      });
      this.echartOption.series.push({
        name: nameObj.columnComment,
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: serviesData.sort((a, b) => a.value - b.value),
        roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            }
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          normal: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: () => Math.random() * 200
      });
      this.initEchart(this.echart, 'page' + this.id, this.echartOption);
    },
    initEchart(echart, id, option) {
      if (this.echartOption.series.length !== this.config.statList.length) return;
      if (!echart) {
        echart = echarts.init(document.getElementById(id));
      }
      echart.setOption(option);
      window.addEventListener('resize', () => {
        echart.resize();
      });
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.page-box{
  width: 100%;
  height: 100%;
  .echartBox{
    width: 100%;
    height: 100%;
  }
}
</style>
