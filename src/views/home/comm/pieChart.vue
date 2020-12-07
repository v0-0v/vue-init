<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
export default {
  name: 'pieChart',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      pieLegendData: ['北京', '上海', '广东'], // 饼状图
      pieSeriesData: [
        { value: 10, name: '北京' },
        { value: 15, name: '上海' },
        { value: 30, name: '广东' }
      ]
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      this.chart.clear();
      this.chart.dispose();
    }
  },
  methods: {
    initChart() {

      // eslint-disable-next-line no-undef
      this.chart = echarts.init(document.getElementById(this.id));
      setTimeout(() => {
        this.chart.resize();
      }, 300);
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: this.pieLegendData
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: [0, '70%'],
            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.pieSeriesData
          }
        ]
      });
      let _this = this;
      window.addEventListener('resize', () => {
        _this.chart.resize();
      });
    }
  }
};
</script>
