export default {
  color: 'rgba(213, 80, 80, 1)',
  title: {
    text: '',
    subtext: '',
    x: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    axisTick: {
      show: true,
      length: 25,
      lineStyle: {
        color: '#ffffff1f'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#ffffff1f'
      }
    },
    data: []
  },
  yAxis: {
    axisTick: {
      show: true,
      length: 25,
      lineStyle: {
        color: '#ffffff1f'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#ffffff1f'
      }
    }
  },
  toolbox: {
    left: 'right',
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {},
      saveAsImage: {}
    }
  },
  // dataZoom: [{
  //   startValue: '2014-06-01'
  // }, {
  //   type: 'inside'
  // }],
  series: [{
    name: '',
    type: 'line',
    data: [],
    smooth: true // 是否平滑曲线显示
  }]
};
