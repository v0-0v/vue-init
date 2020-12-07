export default {
  title: {
    text: '',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  toolbox: {
    top: 6,
    right: 28,
    show: true,
    feature: {
      restore: { show: true },
      saveAsImage: { show: true }

    }
  },
  legend: {
    type: 'scroll',
    orient: 'horizontal',
    left: 0,
    top: 60,
    bottom: 20,
    data: []
  },
  graphic: [
    {
      // 2、中心的文字设置
      type: 'text',
      z: 100,
      left: 'center',
      top: '50%',
      style: {
        x: 3,
        y: 10,
        fill: '#000',
        text: [].join('\n'),
        font: 'bolder 1em "Microsoft YaHei", sans-serif',
        textAlign: 'center' // 3、居中显示
      }
    }
  ],
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['40%', '55%'],
      center: ['50%', '60%'],
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
