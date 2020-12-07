export default {
  title: {
    text: '',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    type: 'scroll',
    orient: 'horizontal',
    left: 0,
    top: 40,
    data: []
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: '35%',
      center: ['50%', '60%'],
      selectedMode: 'single',
      label: {
        normal: {
          formatter: '  {b|{b}：}{c}  {per|{d}%}  ',
          backgroundColor: '#ccc',
          borderColor: '#aaa',
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            a: {
              color: '#999',
              lineHeight: 22,
              align: 'center'
            },
            hr: {
              borderColor: '#aaa',
              width: '100%',
              borderWidth: 0.5,
              height: 0
            },
            b: {
              fontSize: 16,
              lineHeight: 33
            },
            per: {
              color: '#eee',
              backgroundColor: '#334455',
              padding: [2, 4],
              borderRadius: 2
            }
          }
        }
      },
      data: []
    }
  ]
};
