export default {
  loading: false,
  title: {
    text: '',
    x: 'left'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      label: {
        show: true
      }
    },
    // eslint-disable-next-line object-shorthand
    formatter: function(params) {
      let showHtm = `${params[0].name}<br/>`;
      for (let i = 0; i < params.length; i++) {
        let item = params[i];
        if (typeof (item.value) !== 'undefined') {
          showHtm += `${item.marker} ${item.seriesName} : ${item.value}<br/>`;
        }
      }
      return showHtm;
    }
  },
  toolbox: {
    top: 6,
    right: 28,
    show: true,
    feature: {
      restore: { show: true },
      saveAsImage: { show: true },
      myFullScren: {
        show: true,
        title: '全屏',
        icon: 'path://M237.248 832H416v64H173.248l-0.64 0.64-0.64-0.64H128v-43.904l-0.64-0.64 0.64-0.704V608h64v178.752L398.848 579.84l45.248 45.248L237.248 832z m549.504-640H608V128h242.752l0.64-0.64 0.64 0.64H896v43.904l0.64 0.64-0.64 0.704V416h-64V237.248L625.152 444.16l-45.248-45.248L786.752 192z',
        onclick(e) {

          let { option } = e;

          option.toolbox[0].feature.myFullScren.show = false;
          option.toolbox[0].feature.myExitFullScren.show = true;

          let el = document.getElementById(option.targetBoxId).parentNode;

          if (!el) {
            console.error(`id:${option.targetBoxId} 的parentNode 未找到！`);
          }

          if (!option.comTargetStore) {
            option.comTargetStore = {
              width: el.offsetWidth,
              height: el.offsetHeight
            };
          }
          el.style.width = '100%';
          el.style.height = '100%';

          if (!el.className) {
            el.className = 'fullScren';
          }
          else {
            let newClassName = el.className;
            newClassName += ' ';
            newClassName += 'fullScren';
            el.className = newClassName;
          }
        }
      },
      myExitFullScren: {
        show: false,
        title: '退出全屏',
        icon: 'path://M904.992 72.992L608 371.008V96h-64v384h384v-64h-275.008l298.016-296.992zM96 544v64h275.008L72.96 904.992 119.04 951.04 416 652.992V928h64V544z',
        onclick(e) {
          let { option } = e;
          option.toolbox[0].feature.myFullScren.show = true;
          option.toolbox[0].feature.myExitFullScren.show = false;
          let el = document.getElementById(option.targetBoxId).parentNode;
          el.style.width = option.comTargetStore.width + 'px';
          el.style.height = option.comTargetStore.height + 'px';
          if (el.className) {
            let oldClass = el.className;
            let newClass = oldClass.replace('fullScren', '');
            el.className = newClass;
          }
        }
      }
    }
  },
  mydata: [],
  legend: {
    type: 'scroll',
    orient: 'horizontal',
    left: 0,
    right: '5%',
    top: 60,
    data: [],
    itemGap: 5
  },
  xAxis: [
    {
      type: 'category',
      axisLabel: {
        interval: 0,
        rotate: 30
      },
      splitArea: {
        show: true
      },
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value',
      // eslint-disable-next-line object-shorthand
      max: function(value) {
        return Math.ceil(value.max * 1.1);
      }
    }
  ],
  grid: {
    top: '100',
    left: '1%',
    right: '5%',
    containLabel: true
  },
  dataZoom: [
    {
      show: true,
      startValue: 0,
      endValue: 7
    },
    {
      type: 'inside',
      start: 70,
      end: 100
    }
  ],
  series: []
};
