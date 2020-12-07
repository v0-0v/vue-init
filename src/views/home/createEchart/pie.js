export default {
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
      name: '',
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
