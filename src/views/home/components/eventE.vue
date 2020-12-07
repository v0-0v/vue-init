<template>
  <div class="eventE">
    <div :id="this.id" style="width:100%;height:100%"></div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  props: {
    typeCode: {
      Object,
      default() {
        return {};
      }
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      myChart: ''
    };
  },
  mounted() {
    this.creatE();
  },
  methods: {
    creatE() {
      if (!document.getElementById(this.id)) {
        return;
      }
      this.myChart = echarts.init(document.getElementById(this.id));
      let option = {
        // tooltip: {},
        animationDurationUpdate(idx) {
          // 越往后的数据延迟越大
          return idx * 100;
        },
        animationEasingUpdate: 'bounceIn',
        color: ['#fff', '#fff', '#fff'],
        series: [{
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 500,
            edgeLength: 10
          },
          roam: true,
          label: {
            normal: {
              show: true
            }
          },
          data: [{
            name: '考核报表',
            value: '/report/report01',
            symbolSize: 100,
            draggable: true,
            itemStyle: {
              normal: {
                borderColor: 'rgb(98, 224, 224)',
                borderWidth: 4,
                shadowBlur: 100,
                shadowColor: 'rgb(98, 224, 224)',
                color: 'rgb(98, 224, 224)'
              }
            }
          }, {
            name: '网格PK积分榜',
            value: '/assessment/gridPk',
            symbolSize: 100,
            draggable: true,
            itemStyle: {
              normal: {
                borderColor: 'rgb(206, 188, 11)',
                borderWidth: 4,
                shadowBlur: 100,
                shadowColor: 'rgb(206, 188, 11)',
                color: 'rgb(206, 188, 11)'
              }
            }
          }, {
            name: '预警分析',
            value: '/countAssess/warnAnalyse/keyEvent',
            symbolSize: 100,
            draggable: true,
            itemStyle: {
              normal: {
                borderColor: 'rgb(26, 83, 246)',
                borderWidth: 4,
                shadowBlur: 100,
                shadowColor: 'rgb(26, 83, 246)',
                color: 'rgb(26, 83, 246)'
              }
            }
          }]
        }]
      };
      this.myChart.setOption(option, true);
      setTimeout(() => {
        this.myChart.resize();
      }, 500);
      this.myChart.on('click', parmas => {
        console.log(parmas);
        this.$router.push(parmas.data.value);
      });
      window.addEventListener('resize', () => {
        if (this.myChart) {
          this.myChart.resize();
        }
      });
    }

  }

};
</script>

<style lang="scss" scoped>
.eventE {
  width: 100%;
  height: 100%;
}
</style>
