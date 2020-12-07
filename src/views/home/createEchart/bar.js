export default {
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
