<template>
  <div class="eventC">
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
      myChart: '',
      //   code: '',
      eventaData: [], // 接口数据
      eventHandle: { // 处理后的数据
        xAxisData: [],
        seriesData: [],
        titleName: ''
      }
    };
  },
  watch: {
    typeCode: { // 监听父组件传递子组件的数据
      handler(val) {
        // this.code = val.typeCode;
        this.eventHandle.titleName = val.typeName;
        // console.log('111子页面接受到的数据类型', this.typeCode);
        if (val.typeCode) {
          this.getEventNumByType(val.typeCode);
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 昨日各关键事件类型区域分布
    async getEventNumByType(code) {
      const res = await this.$services.post({
        type: 'HOME',
        url: 'getEventNumByType',
        params: {
          type: code
          //   typeId: 'B09'
        }
      });
      if (res.bean) {
        // console.log('某事件信息', res.bean);
        this.eventaData = res.bean;
        let arr = [{
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-01',
          orgId: '20000546',
          orgName: '苍北'
        }, {
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-02',
          orgId: '20000546',
          orgName: '萧山'
        }, {
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-02',
          orgId: '20000546',
          orgName: '西湖'
        }, {
          eventNum: 60,
          eventType: '环境污染',
          occurDate: '2019-06-04',
          orgId: '20000546',
          orgName: '远航'
        }, {
          eventNum: 20,
          eventType: '环境污染',
          occurDate: '2019-06-05',
          orgId: '20000546',
          orgName: '仓前'
        }, {
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-06',
          orgId: '20000546',
          orgName: '攻速'
        }, {
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-07',
          orgId: '20000546',
          orgName: '滨江'
        },
        {
          eventNum: 190,
          eventType: '环境污染',
          occurDate: '2019-06-08',
          orgId: '20000546',
          orgName: '滨江11111'
        }, {
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-09',
          orgId: '20000546',
          orgName: '滨江11'
        }, {
          eventNum: 130,
          eventType: '环境污染',
          occurDate: '2019-06-10',
          orgId: '20000546',
          orgName: '滨江1'
        },
        {
          eventNum: 90,
          eventType: '环境污染',
          occurDate: '2019-06-13',
          orgId: '20000546',
          orgName: '滨aa江1'
        }];
        this.eventaData = this.eventaData.concat(arr);
        this.dateNum(this.eventaData);
      }
    },
    // 将同一时间的数据相加
    dateNum(data) {
      //   console.log('**tl*', data);
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
      //   console.log('aaa', obj);
      // console.log(' Object.keys(obj);', Object.keys(obj));
      // eslint-disable-next-line guard-for-in
      for (let key in obj) {
        this.eventHandle.xAxisData.push(key);
        this.eventHandle.seriesData.push({
          value: obj[key],
          date: key
        });
      }
      this.creatE();
    },
    creatE() {
      if (!document.getElementById(this.id)) {
        return;
      }
      this.myChart = echarts.init(document.getElementById(this.id));
      let option = {
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        // color: ['#3398DB'],
        color: 'rgba(213, 80, 80, 1)',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        legend: {
          data: [],
          show: true
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '5%',
          top: '7%',
          height: '85%',
          containLabel: true,
          z: 22
        },
        xAxis: [{
          type: 'category',
          gridIndex: 0,
          data: [],
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#0c3b71'
            }
          },
          axisLabel: {
            show: true,
            color: 'rgba(0,0,0,.6)',
            fontSize: 14,
            interval: 0,
            rotate: 40
          }
        }],
        yAxis: [{
          type: 'value',
          gridIndex: 0,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0,0,0,.6)'
            }
          }
        },
        {
          type: 'value',
          gridIndex: 0,
          min: 0,
          max: 100,
          splitNumber: 12,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
            }
          }
        }
        ],
        series: [{
          name: '环境污染总数',
          type: 'bar',
          barWidth: '30%',
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1, [{
                  offset: 0,
                  color: '#00feff'
                },
                {
                  offset: 0.5,
                  color: '#027eff'
                },
                {
                  offset: 1,
                  color: '#0286ff'
                }
                ]
              )
            }
          },
          data: [],
          zlevel: 11,
          label: {
            normal: {
              show: true
            }
          },
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          }
        }]
      };
      option.title['text'] = this.eventHandle.titleName;
      option.xAxis[0]['data'] = this.eventHandle.xAxisData;
      option.series[0]['data'] = this.eventHandle.seriesData;
      this.myChart.setOption(option, true);
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
.eventC {
  width: 100%;
  height: 100%;
}
</style>
