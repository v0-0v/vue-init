<template>
  <div class="eventA">
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
  mounted() {
    console.log('#####################', this.id);
  },
  data() {
    return {
      myChart: '',
      eventaData: [], // 接口数据
      eventHandle: { // 处理后的数据
        legendData: [],
        seriesData: [],
        selected: {},
        titleName: ''
      }
    };
  },
  watch: {
    typeCode: { // 监听父组件传递子组件的数据
      handler(val) {
        this.eventHandle.titleName = val.typeName;
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA111子页面接受到的数据类型', val);
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
      const { status, bean } = await this.$services.post({
        type: 'HOME',
        url: 'getEventNumByType',
        params: {
          // typeId: 'B09'
          typeId: code
        }
      });
      if (status) {
        console.log('某事件信息', bean);
        this.eventaData = bean;
        let arr = [{
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-13',
          orgId: '20000546',
          orgName: '苍北'
        }, {
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-13',
          orgId: '20000546',
          orgName: '萧山'
        }, {
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-13',
          orgId: '20000546',
          orgName: '西湖'
        }, {
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-13',
          orgId: '20000546',
          orgName: '远航'
        }, {
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-13',
          orgId: '20000546',
          orgName: '仓前'
        }, {
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-13',
          orgId: '20000546',
          orgName: '攻速'
        }, {
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-13',
          orgId: '20000546',
          orgName: '滨江'
        },
        {
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-13',
          orgId: '20000546',
          orgName: '滨江11111'
        }, {
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-13',
          orgId: '20000546',
          orgName: '滨江11'
        }, {
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-13',
          orgId: '20000546',
          orgName: '滨江1'
        },
        {
          eventNum: 10,
          eventType: '环境污染',
          occurDate: '2019-06-13',
          orgId: '20000546',
          orgName: '滨aa江1'
        }];
        this.eventaData = this.eventaData.concat(arr);
        this.handleData(this.eventaData);
      }
    },
    // 处理数据分布
    handleData(data) {
      let name = '';
      for (let i = 0; i < data.length; i++) {
        name = data[i]['orgName'];
        this.eventHandle.legendData.push({
          name,
          icon: 'rect'
        });
        this.eventHandle.seriesData.push({
          name,
          value: data[i]['eventNum'],
          date: '2019-01'
        });
        if (i <= 6) {
          this.eventHandle.selected[name] = true;
        }
        else {
          this.eventHandle.selected[name] = false;
        }
      }
      this.creatE();
    },
    creatE() {
      if (!document.getElementById(this.id)) {
        return;
      }
      this.myChart = echarts.init(document.getElementById(this.id));
      let option = {
        color: ['#ff9f7e', '#5f71d2', '#f36f8a', '#5fd27b', '#6173d6', '#47dfae',
          '#4ac7f5', '#f36f8a', '#42a4eb', '#426eeb', '#5f71d2', '#f36f8a'
        ],
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter(params) {
            console.log('OO', params);
            return '<span>' + params.data.date + '</span><br/>' + params.marker + '<span>' + params.data.name + ': ' + params.data.value + ' ( ' + params.percent + '% )</span>';

          }
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          itemWidth: 13,
          data: [],
          selected: {}
          //   selected: {
          //     5: true,
          //     6: false
          //   }
        },
        series: [
          {
            name: this.eventHandle.titleName,
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: [],
            // data: [{ name: '1', value: 100}],
            // roseType: 'area',
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      option.title['text'] = this.eventHandle.titleName;
      option.legend['data'] = this.eventHandle.legendData;
      option.series[0]['data'] = this.eventHandle.seriesData;
      option.legend.selected = this.eventHandle.selected;

      this.myChart.setOption(option, true);
      this.myChart.resize();
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
.eventA {
  width: 100%;
  height: 100%;
}
</style>
