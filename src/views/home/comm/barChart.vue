<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
export default {
  name: 'barChart',
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
      // 饼状图
      barAxisData: ['北京', '上海', '广东'], // 柱状图
      barSeriesData: [10, 15, 30] // 柱状图
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
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.barAxisData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '操作',
            type: 'bar',
            barWidth: '60%',
            data: this.barSeriesData
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
