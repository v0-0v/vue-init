<template>
  <div class="componentContainer" ref="componentContainer">

    <grid-layout :layout.sync="layout" :col-num="12" :row-height="30" :is-draggable="true" :is-resizable="true" :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="true" :responsive="true">

      <grid-item v-for="(item,index) in layout" :key="index" style="border:1px solid #ddd;" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" @resized="resizedEvent">
        <el-card shadow="hover" style="height: 100%">
          <div slot="header" class="clearfix">
            <span class="name" v-if="item.option&&item.option.name">{{item.option.name}}</span>
            <span class="name" v-else></span>
            <el-button class="edit-btn" style="float: right; padding: 3px 0" type="text" icon="el-icon-edit-outline" @click="selectComponent(index)"></el-button>
          </div>
          <!-- <component :height="componentBoxWidth * 4 / 2.25 - 30 + 'px'" :is="item.component" :id="'chart' + index" v-if="item.component" width="100%"></component> -->
          <div :id="'chart' + index" :style="'height: 100%;width:100%'" v-loading="item.option&&item.option.loading ? item.option.loading : false"></div>
        </el-card>
      </grid-item>
    </grid-layout>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import VueGridLayout from 'vue-grid-layout';
import pieChart from './comm/pieChart';
import barChart from './comm/barChart';

export default {
  name: 'componentBox',
  inject: ['$datePipe'],
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  props: {
    componentList: {
      type: Array
    }
  },
  computed: {
    ...mapGetters({
      currentSkin: 'skin/currentSkin'
    })
  },
  data() {
    return {
      componentBoxWidth: '180',
      layout: [],
      myChart: ['', '', '', '', '', '', '', '', ''],
      themeName: ''
    };
  },
  watch: {
    componentList() {
      this.layout = this.$utils.deepCopy(this.componentList);
      // this.layout = this.componentList
      console.log(this.layout);
      this.$nextTick(() => {
        setTimeout(() => {
          this.initEchart();
        }, 300);
      });
    },
    currentSkin(skin) {
      this.setTheme(skin);
    }
  },
  mounted() {
    this.themeName = this.currentSkin.name === '透明' ? 'halloween' : '';
  },
  methods: {
    setTheme(skin) {
      this.themeName = skin.name === '透明' ? 'halloween' : '';
      this.myChart.forEach(item => {
        if (item !== '') {
          // item = '';
          item.dispose();
          // this.myChart[index] = echarts.init(document.getElementById('chart' + index), this.themeName);
        }
      });
      this.initEchart();
    },
    initEchart() {
      for (let i = 0; i < this.layout.length; i++) {
        // this.myChart[i] = '';
        if (this.layout[i].option && this.layout[i].option.compJson) {
          this.myChart[i] = echarts.init(document.getElementById('chart' + i), this.themeName);
          let option = JSON.parse(JSON.stringify(this.layout[i].option));
          let paramDate = this.getStatDate(option.statDate);
          let compJson = JSON.parse(option.compJson);
          let compApi = JSON.parse(option.compApi);
          if (compJson.toolbox && compJson.toolbox.feature && compJson.toolbox.feature.myFullScren) {
            compJson.toolbox.feature.myFullScren.show = false;
            compJson.toolbox.feature.myExitFullScren.show = false;
          }
          if (compJson.toolbox && compJson.toolbox.feature && compJson.toolbox.feature.myExcelDownload) {
            compJson.toolbox.feature.myExcelDownload.show = false;
          }
          if (compJson.title.subtext) {
            compJson.title.subtext = paramDate.startDate + '~' + paramDate.endDate;
          }
          compJson.dataZoom && compJson.dataZoom.length > 0 && compJson.dataZoom.forEach(k => {
            k.type = 'inside';
          });
          compJson.grid.bottom = '10';
          /* eslint-disable guard-for-in */
          for (let key in compApi) {
            let param = compApi[key].params;
            param.beginDate = paramDate.startDate;
            param.endDate = paramDate.endDate;
            this.layout[i].option.loading = true;
            this.$set(this.layout[i], option, this.layout[i].option);
            this.$services.post({
              type: compApi[key].type,
              url: compApi[key].url,
              params: param
            })
              .then(({ bean }) => {
                this.layout[i].option.loading = false;
                this.$set(this.layout[i], option, this.layout[i].option);
                if (compApi[key].relevantData.length !== 0) {
                  let dataList = [];
                  compApi[key].relevantData.forEach(relevant => {
                    let item = {
                      name: relevant.data,
                      value: []
                    };
                    dataList.push(item);
                  });
                  bean.forEach(list => {
                    compApi[key].relevantData.forEach((data, index) => {
                      let item = null;
                      if (typeof data.fieldData === 'string') {
                        item = list[data.fieldData];
                      }
                      else {
                        item = {};
                        for (let key2 in data.fieldData) {
                          item[key2] = list[data.fieldData[key2]];
                        }
                      }
                      if (!data.judge) {
                        dataList[index].value.push(item);
                      }
                      else if (data.judge.type === 'exist') { // 不重复
                        if (dataList[index].value.indexOf(item) === -1) {
                          dataList[index].value.push(item);
                        }
                      }
                      else if (data.judge.type === 'condition') { // 根据条件判断
                        if (list[data.judge.judgeField] === data.judge.value) {
                          dataList[index].value.push(item);
                        }
                      }
                    });
                  });
                  console.log(dataList);
                  for (let j = 0; j < dataList.length; j++) {
                    let nameLast = dataList[j].name.split('.')[1];
                    let namefirst = '';
                    let namesecend = '';
                    /* eslint-disable prefer-destructuring */
                    if (dataList[j].name.split('.')[0].split('[').length > 1) {
                      namefirst = dataList[j].name.split('.')[0].split('[')[0];
                      namesecend = dataList[j].name.split('.')[0].split('[')[1][0];
                      compJson[namefirst][namesecend][nameLast] = dataList[j].value;
                    }
                    else {
                      namefirst = dataList[j].name.split('.')[0];
                      compJson[namefirst][nameLast] = dataList[j].value;
                    }
                    console.log(namefirst, namesecend, nameLast);
                  }
                  this.myChart[i].setOption(compJson, true);
                }
                else { // 数据特殊处理
                /* eslint-disable no-lonely-if */
                  if (compApi[key].special === 'policeEvaluate-dateBar') {
                    let newCompJson = this.policeEvaluateDateBar(compJson, bean);
                    this.myChart[i].setOption(newCompJson, true);
                  }
                  else if (compApi[key].special === 'policeEvaluate-lbTotal') {
                    let newCompJson = this.policeEvaluateLbTotal(compJson, bean);
                    this.myChart[i].setOption(newCompJson, true);
                  }
                  else if (compApi[key].special === 'policeEvaluate-lbBar') {
                    let newCompJson = this.policeEvaluateLbBar(compJson, bean);
                    this.myChart[i].setOption(newCompJson, true);
                  }
                  else if (compApi[key].special === 'policeWork-depBar') {
                    let newCompJson = this.policeWorkDepBar(compJson, bean);
                    this.myChart[i].setOption(newCompJson, true);
                  }
                  else if (compApi[key].special === 'policeWork-dateBar') {
                    let newCompJson = this.policeWorkDateBar(compJson, bean);
                    this.myChart[i].setOption(newCompJson, true);
                  }
                  else if (compApi[key].special === 'policeWork-hjdBar') {
                    let newCompJson = this.policeWorkHjdBar(compJson, bean);
                    this.myChart[i].setOption(newCompJson, true);
                  }
                  else if (compApi[key].special === 'policeWork-zoomBarData') {
                    let newCompJson = this.policeWorkZoomBarData(compJson, bean);
                    this.myChart[i].setOption(newCompJson, true);
                  }
                  else if (compApi[key].special === 'forecast-pgis') {
                    let newCompJson = this.forecastPgis(compJson, bean);
                    this.myChart[i].setOption(newCompJson, true);
                  }
                  else if (compApi[key].special === 'large-everyMonth') {
                    let newCompJson = this.largeEveryMonth(compJson, bean);
                    this.myChart[i].setOption(newCompJson, true);
                  }
                  else if (compApi[key].special === 'large-areaCover') {
                    let newCompJson = this.largeAreaCover(compJson, bean);
                    this.myChart[i].setOption(newCompJson, true);
                  }
                }
              });
          }
          console.log(compJson);
          window.addEventListener('resize', () => {
            this.myChart[i].resize();
            this.layout[i].option.loading = false;
            this.$set(this.layout[i], option, this.layout[i].option);
          });
        }
      }
    },
    policeEvaluateDateBar(option, bean) {
      let timeData = this.$utils.transJson(bean);
      let newCompJson = option;
      let depCodeObj = {};
      let timxAxis = [];
      let timLegend = [];
      let timseries = [];
      timeData[0].data.forEach(dat => {
        timxAxis.push(dat.date);
      });
      timeData.forEach(tim => {
        let index = tim.depName.indexOf('公安局');
        if (index === -1) {
          index = tim.depName.length;
        }
        timLegend.push(tim.depName.slice(0, index));
        // depCodeArr.push(tim.depCode);
        depCodeObj[tim.depName.slice(0, index)] = tim.depCode;
        let jqzsArr = [];
        let yxjgArr = [];
        tim.data.forEach(jq => {
          jqzsArr.push(jq.jqzs);
          yxjgArr.push(jq.yxjq);
        });
        timseries.push({
          name: tim.depName.slice(0, index),
          type: 'bar',
          stack: tim.depCode,
          data: jqzsArr
        });
        timseries.push({
          name: tim.depName.slice(0, index) + '有效',
          type: 'bar',
          stack: tim.depCode,
          data: yxjgArr
        });
      });
      newCompJson.xAxis.data = timxAxis;
      newCompJson.legend.data = timLegend;
      newCompJson.series = timseries;

      newCompJson.dataZoom = [
        {
          type: 'inside',
          show: true,
          startValue: timxAxis.length > 14 ? timxAxis.length - 14 : 0,
          endValue: timxAxis.length - 1
        }
      ];
      return newCompJson;
    },
    policeEvaluateLbTotal(option, bean) {
      let newCompJson = option;
      let oData = {};
      let lbdmJson = {};
      for (let i = 0; i < bean.length; i++) {
        let { date, lbmz, jqzs, lbdm } = bean[i];
        if (!oData[date]) {
          oData[date] = {};
        }
        if (!lbdmJson[lbmz]) {
          lbdmJson[lbmz] = lbdm;
        }
        oData[date][lbmz] = jqzs;
      }
      let bigTimeData = this.$utils.parseArra(oData);
      newCompJson.xAxis.data = bigTimeData.x;
      newCompJson.legend.data = bigTimeData.len;
      newCompJson.series = bigTimeData.series;
      newCompJson.lbdmJson = lbdmJson;
      newCompJson.dataZoom = [
        {
          show: true,
          type: 'inside',
          startValue: bigTimeData.x.length > 14 ? bigTimeData.x.length - 14 : 0,
          endValue: bigTimeData.x.length - 1
        }
      ];
      return newCompJson;
    },
    policeEvaluateLbBar(option, bean) {
      let newCompJson = option;
      let oData = {};
      let lbdmJson = {};
      for (let i = 0; i < bean.length; i++) {
        let { date, lbmz, jqzs, lbdm } = bean[i];
        if (!oData[date]) {
          oData[date] = {};
        }
        if (!lbdmJson[lbmz]) {
          lbdmJson[lbmz] = lbdm;
        }
        oData[date][lbmz] = jqzs;
      }
      let bigTimeData = this.$utils.parseArra(oData);
      newCompJson.title[0].subtext = this.codeNameParams.deepName;
      newCompJson.xAxis[0].data = bigTimeData.x;
      newCompJson.legend.data = bigTimeData.len;
      newCompJson.series = bigTimeData.series;
      newCompJson.lbdmJson = lbdmJson;
      return newCompJson;
    },
    policeWorkDepBar(option, bean) {
      let newCompJson = option;
      let oData = {};
      let depNameCode = {};
      for (let i = 0; i < bean.length; i++) {
        let { depName, name, statCount, depCode } = bean[i];
        if (!oData[depName]) {
          oData[depName] = {};
          depNameCode[depName] = depCode;
        }
        oData[depName][name] = statCount;
      }
      const option2 = this.parseArra(oData);
      newCompJson.depNameCode = depNameCode;
      newCompJson.dataZoom = [
        {
          show: true,
          type: 'inside',
          startValue: option2.x.length > 30 ? option2.x.length - 30 : 0,
          endValue: option2.x.length - 1
        }
      ];
      newCompJson.legend.data = option2.len;
      newCompJson.xAxis[0].data = option2.x;
      newCompJson.series = option2.series;

      return newCompJson;
    },
    policeWorkDateBar(option, bean) {
      let newCompJson = option;
      newCompJson.xAxis[0].offset = 10;
      newCompJson.tooltip.enterable = true;
      newCompJson.tooltip.formatter = this.tooltip;
      let oData = {};
      // depCodes 数组
      let depCodes = {};
      for (let i = 0; i < bean.length; i++) {
        let { date, depName, name, statCount, depCode } = bean[i];
        // console.log(oData);
        if (!depCodes[depName]) {
          depCodes[depName] = depCode;
        }
        if (!oData[date]) {
          oData[date] = {};
        }
        if (!oData[date][depName]) {
          oData[date][depName] = {};
        }
        oData[date][depName][name] = statCount;
      }
      let oResult = this.parseSArray(oData, depCodes);
      newCompJson.dataZoom = [
        {
          show: true,
          type: 'inside',
          startValue: oResult.x.length > 7 ? oResult.x.length - 7 : 0,
          endValue: oResult.x.length - 1
        }
      ];
      newCompJson.legend.data = oResult.len;
      newCompJson.xAxis[0].data = oResult.x;
      newCompJson.series = oResult.series;

      return newCompJson;
    },
    policeWorkHjdBar(option, bean) {
      let newCompJson = option;
      newCompJson.mydata = bean;
      newCompJson.xAxis[0].offset = 10;
      newCompJson.tooltip.enterable = true;
      // eslint-disable-next-line func-names
      newCompJson.tooltip.formatter = this.tooltip;
      let oData = {};
      // depCodes 数组
      let depCodes = {};
      for (let i = 0; i < bean.length; i++) {
        let { household, depName, name, statCount, depCode } = bean[i];
        // console.log(oData);
        if (!depCodes[depName]) {
          depCodes[depName] = depCode;
        }
        if (!oData[household]) {
          oData[household] = {};
        }
        if (!oData[household][depName]) {
          oData[household][depName] = {};
        }
        oData[household][depName][name] = statCount;
      }
      let oResult = this.parseSArray(oData, depCodes);
      newCompJson.dataZoom = [
        {
          show: true,
          type: 'inside',
          startValue: oResult.x.length > 7 ? oResult.x.length - 7 : 0,
          endValue: oResult.x.length - 1
        }
      ];
      newCompJson.legend.data = oResult.len;
      newCompJson.xAxis[0].data = oResult.x;
      newCompJson.series = oResult.series;
      return newCompJson;
    },
    policeWorkZoomBarData(option, bean) {
      let newCompJson = option;
      newCompJson.mydata = bean;
      let oData = {};
      for (let i = 0; i < bean.length; i++) {
        let { date, name, statCount } = bean[i];
        if (!oData[date]) {
          oData[date] = {};
        }
        oData[date][name] = statCount;
      }
      const option2 = this.parseArra(oData);
      newCompJson.dataZoom = [
        {
          show: true,
          type: 'inside',
          startValue: option2.x.length > 7 ? option2.x.length - 7 : 0,
          endValue: option2.x.length - 1
        }
      ];
      newCompJson.legend.data = option2.len;
      newCompJson.xAxis[0].data = option2.x;
      newCompJson.series = option2.series;
      return newCompJson;
    },
    forecastPgis(option, bean) {
      let newCompJson = option;
      const list = [];
      const object = {};
      if (!(bean && bean.length > 0)) return list;
      bean.forEach(val => {
        if (val.dep_code !== 330000000000 && !object[val.dep_code]) {
          object[val.dep_code] = val.dep_code;
          list.push(val);
        }
      });
      list.forEach(l => {
        newCompJson.xAxis[0].data.push(l.dep_name_abb);
        newCompJson.series[0].data.push(l.zbvalue);
      });

      return newCompJson;
    },
    largeEveryMonth(option, bean) {
      let newCompJson = option;
      let xAxisData = [];
      let unFinishData = [];
      let finishData = [];
      let percentData = [];
      bean && bean.length > 0 && bean.forEach(k => {
        xAxisData.push(k.date);
        unFinishData.push(k.statSum);
        finishData.push(k.statEffective);
        percentData.push(k.statSum === 0 ? 0 : (k.statEffective / k.statSum).toFixed(2));
      });
      newCompJson.xAxis[0].data = xAxisData;
      newCompJson.series[0].data = unFinishData;
      newCompJson.series[1].data = finishData;
      newCompJson.series[2].data = percentData;
      return newCompJson;
    },
    largeAreaCover(option, bean) {
      let newCompJson = option;
      let eventData = [];
      let keyData = [];
      let xAxisData = [];
      let percentData = [];
      bean && bean.length > 0 && bean.forEach(k => {
        eventData.push(k.statSum);
        keyData.push(k.statEffective);
        xAxisData.push(k.shortname);
        percentData.push(k.statSum === 0 ? 0 : (k.statEffective / k.statSum).toFixed(2));
      });
      newCompJson.xAxis[0].data = xAxisData;
      newCompJson.series[0].data = eventData;
      newCompJson.series[1].data = keyData;
      newCompJson.series[2].data = percentData;
      return newCompJson;
    },
    /**
     * 由四层对象转echarts 堆叠图
     */
    parseSArray(data, depCodes) {
      let result = {
        map: {},
        stack: [],
        legend: [],
        legend2: [],
        x: [],
        len: [],
        series: []
      };

      let isOtherExtra = false;
      /**
       * 遍历出x轴 array 和legend array
       */
      // eslint-disable-next-line guard-for-in
      for (let xVal in data) {
        result.x.push(xVal);
        let lenObj = data[xVal];
        // eslint-disable-next-line guard-for-in
        for (let stackVal in lenObj) {
          if (!result.stack.includes(stackVal)) {
            result.stack.push(stackVal);
          }
          // 假的len
          // if (!result.len.includes(stackVal)) {
          //   result.len.push(stackVal);
          // }
          let stackObj = lenObj[stackVal];
          for (let lenValue in stackObj) {
            if (!result.legend.includes(lenValue)) {
              // 额外处理‘其他’
              if (lenValue === '其他') {
                isOtherExtra = true;
              }
              else {
                result.legend.push(lenValue);
              }
            }
          }
        }
      }

      // 额外处理其他
      if (isOtherExtra) {
        result.legend.push('其他');
      }

      for (let stackIndex = 0; stackIndex < result.stack.length; stackIndex++) {
        let stack = result.stack[stackIndex];
        let code = String.fromCharCode(65 + stackIndex);
        // 假的len(上面的弃用)
        result.len.push(code + '-' + stack);

        let itemSeriesBase = {
          name: code + '-' + stack,
          id: stack + '-' + depCodes[stack] + '-' + code,
          type: 'bar',
          stack: depCodes[stack],
          data: new Array(result.x.length).fill(0),
          label: {
            normal: {
              show: true,
              position: 'bottom',
              offset: [0, -9],
              formatter() {
                return code;
              }
            }
          }
        };
        result.series.push(itemSeriesBase);

        /**
         * 根据legend 遍历出series item
         */
        for (let lenIndex = 0; lenIndex < result.legend.length; lenIndex++) {
          let legend = result.legend[lenIndex];
          let itemSeries = {
            name: legend,
            id: stack + '-' + depCodes[stack] + '-' + code + '-' + legend,
            type: 'bar',
            stack: depCodes[stack],
            data: []
            // itemStyle: {
            //   show: lenIndex === 0,
            //   borderColor: colorObj[stack],
            //   borderWidth: 2
            // }
          };
          // 根据x轴 遍历每个 data 值
          for (let xIndex = 0; xIndex < result.x.length; xIndex++) {
            let xValue = result.x[xIndex];
            itemSeries.data.push(data[xValue][stack][legend]);
          }
          result.series.push(itemSeries);
        }
      }

      return result;
    },
    /**
     * 日期维度和户籍维度的bar tooltip
     */
    tooltip(params) {
      let obj = {};
      let showHtm = `<div style="max-height:300px;max-width:240px;white-space: pre-wrap;overflow-y:auto;">${
        params[0].axisValue
      }`;
      for (let i = 0; i < params.length; i++) {
        let item = params[i];
        let arry = item.seriesId.split('-');
        if (arry.length === 3) {
          // eslint-disable-next-line no-continue
          continue;
        }
        if (typeof item.value !== 'undefined') {
          let [title] = arry;
          let code = arry[arry.length - 2];
          if (!obj[title]) {
            showHtm += `<p style="padding-right:10px;color:#eee;">${code}-${title}</p>`;
            obj[title] = 1;
          }
          showHtm += `<p style="padding:0px 18px 0px 18px;">${item.marker}${
            item.seriesName
          }: ${item.value}</p>`;
        }
      }
      showHtm += '</div>';
      obj = null;
      return showHtm;
    },
    /**
     * 由3层对象转echarts 数组
     */
    parseArra(data) {
      let result = {
        map: {},
        x: [],
        len: [],
        series: []
      };

      let isOtherExtra = false;
      /**
       * 遍历出x轴 array 和legend array
       */
      // eslint-disable-next-line guard-for-in
      for (let xVal in data) {
        result.x.push(xVal);
        let lenObj = data[xVal];
        for (let lenVal in lenObj) {
          if (!result.len.includes(lenVal)) {
            if (lenVal === '其他') {
              isOtherExtra = true;
            }
            else {
              result.len.push(lenVal);
            }
          }
        }
      }
      // 额外处理其他
      if (isOtherExtra) {
        result.len.push('其他');
      }
      /**
       * 根据legend 遍历出series item
       */
      for (let lenIndex = 0; lenIndex < result.len.length; lenIndex++) {
        let legend = result.len[lenIndex];
        let itemSeries = {
          name: legend,
          type: 'bar',
          label: {
            show: result.len.length <= 3,
            formatter(param) {
              // console.log(param);
              return param.value === 0 ? '' : param.value;
            }
          },
          data: []
        };
        // 根据x轴 遍历每个 data 值
        for (let xIndex = 0; xIndex < result.x.length; xIndex++) {
          let xValue = result.x[xIndex];
          itemSeries.data.push(data[xValue][legend]);
        }

        result.series.push(itemSeries);
      }

      return result;
    },
    getStatDate(statDate) {
      let today = new Date();
      let endDate = null;
      let startDate = null;
      switch (statDate) {
        case '1102AB7FC7684C339B7176BD81CED11C': // 本周
          endDate = today;
          startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '1A511930F8EB46DC9615C8259ED39F32': // 昨天
          endDate = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);
          startDate = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);
          break;
        case '231BE62FBAC94E909104D46AC025BF9C': // 本季度
          endDate = today;
          startDate = new Date(today.getTime() - 92 * 24 * 60 * 60 * 1000);
          break;
        case '764739D904674982B6168797B21F46E8': // 本半年
          endDate = today;
          startDate = new Date(today.getTime() - 182 * 24 * 60 * 60 * 1000);
          break;
        case 'BC40D22044724D31A8C22A5B6AFD67F6': // 本月
          endDate = today;
          startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case 'DC87BDB1AE234468B3BF83C3997DF8DD': // 本年
          endDate = today;
          startDate = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          endDate = today;
          startDate = today;
      }
      let date = {
        startDate: this.$datePipe(startDate, 'YYYY-MM-DD') + ' 00:00:00',
        endDate: this.$datePipe(endDate, 'YYYY-MM-DD') + ' 23:59:59'
      };
      return date;
    },
    resizedEvent(i, newH, newW, newHPx, newWPx) {
      console.log('RESIZED i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx);
      let myEvent = new Event('resize');
      window.dispatchEvent(myEvent);
    },
    selectComponent(order) {
      // 选择组件
      let num = 1 + order;
      this.$emit('getResourceData', {
        order: num
      });
    },
    count(index) {
      switch (index) {
        case 0:
          return 24;
        case 1:
          return 14;
        case 2:
          return 10;
        case 3:
          return 14;
        case 4:
          return 10;
        case 5:
          return 14;
        case 6:
          return 10;
        case 7:
          return 10;
        case 8:
          return 14;
        default:
          return 0;
      }
    }
  }
};
</script>
<style lang="scss">
.componentContainer {
  width: 100%;
  margin-bottom: 60px;

  .el-card {
    overflow: hidden;
    position: relative;
  }
  .el-card__header {
    z-index: 1111 !important;
    background: #009af8 !important;
    width: 100%;
    opacity: 0.7;
    padding: 0 !important;
    height: 50px;
    line-height: 50px;
    display: block;
    color: white;
    transition: 1s;
    position: absolute;
    top: -100px;
    border-radius: 100px;

    .name {
      margin-left: 15px;
    }

    .edit-btn {
      cursor: pointer;
      color: white;
      height: 50px;
      margin-right: 15px;
    }
  }

  .el-card:hover .el-card__header {
    border-radius: 0;
    top: 0;
  }
  .el-card__body{
    height: calc(100% - 50px);
  }
  .fullScren {
    position: fixed !important;
    background-size: cover;
    background-color: #fff !important;
    width: 100% !important;
    height: 100% !important;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    padding: 40px;
    box-sizing: border-box;
  }
}


</style>
