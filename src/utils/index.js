import md5 from 'js-md5';
import storageMode from '@/storage';
import XLSX from 'xlsx';
import crypto from './crypto';
import toExport from './downloadPDF';

const addZero = item => {
  item = item < 10 ? '0' + item : item;
  return item;
};

/* 时间戳转换成"yyyy-mm-dd hh:mm:ss"格式 */
const getTime = time => {
  let newTime = new Date();
  if (time) {
    newTime = new Date(time);
  }
  let Year = newTime.getFullYear();
  let Month = addZero(newTime.getMonth() + 1);
  let Day = addZero(newTime.getDate());
  let Hour = addZero(newTime.getHours());
  let Minute = addZero(newTime.getMinutes());
  let Second = addZero(newTime.getSeconds());

  return `${Year}-${Month}-${Day} ${Hour}:${Minute}:${Second}`;
};

const getTimeByDay = time => {
  let newTime = new Date();
  if (time) {
    newTime = new Date(time);
  }
  let Year = newTime.getFullYear();
  let Month = addZero(newTime.getMonth() + 1);
  let Day = addZero(newTime.getDate());

  return `${Year}-${Month}-${Day}`;
};
const getTimeByMonth = time => {
  let newTime = new Date();
  if (time) {
    newTime = new Date(time);
  }
  let Year = newTime.getFullYear();
  let Month = addZero(newTime.getMonth() + 1);
  return `${Year}-${Month}`;
};

const getTimeALL = time => {
  let newTime = new Date();
  if (time) {
    newTime = new Date(time);
  }
  let Year = newTime.getFullYear();
  let Month = addZero(newTime.getMonth() + 1);
  let Day = addZero(newTime.getDate());
  let Hour = addZero(newTime.getHours());
  let Minute = addZero(newTime.getMinutes());
  let Second = addZero(newTime.getSeconds());
  let milliSeconds = newTime.getMilliseconds();
  return `${Year}${Month}${Day}${Hour}${Minute}${Second}${milliSeconds}`;
};
const getTime2 = time => {
  let newTime = new Date();
  if (time) {
    newTime = new Date(time);
  }
  let Year = newTime.getFullYear();
  let Month = addZero(newTime.getMonth() + 1);
  let Day = addZero(newTime.getDate());
  let Hour = addZero(newTime.getHours());
  let Minute = addZero(newTime.getMinutes());
  let Second = addZero(newTime.getSeconds());
  return `${Year}${Month}${Day}${Hour}${Minute}${Second}`;
};
const getTimeToMonth = time => {
  let newTime = new Date();
  if (time) {
    newTime = new Date(time);
  }
  let Year = newTime.getFullYear();
  let Month = addZero(newTime.getMonth() + 1);

  return `${Year}年${Month}月`;
};

const getTimeToDay = time => {
  let newTime = new Date();
  if (time) {
    newTime = new Date(time);
  }
  let Year = newTime.getFullYear();
  let Month = addZero(newTime.getMonth() + 1);
  let Day = addZero(newTime.getDate());

  return `${Year}年${Month}月${Day}日`;
};
// 时间截取
const parseTimeNumber = val => {
  let _time = '';
  if (val && val.slice) {
    let Year = val.slice(0, 4);
    let Month = val.slice(4, 6);
    let Day = val.slice(6, 8);
    let Hour = val.slice(8, 10);
    let Minute = val.slice(10, 12);
    let Second = val.slice(12, 14);
    _time = `${Year}-${Month}-${Day} ${Hour}:${Minute}:${Second}`;
  }

  return _time;
};

const transforTree = treeData => {
  if (!treeData || treeData.length === 0) {
    return [];
  }
  const childs = [];
  treeData.forEach(tree => {
    if (tree.childRepDepConfigs && tree.childRepDepConfigs.length > 0) {
      childs.push({
        value: tree.depCode,
        label: tree.depName,
        children: transforTree(tree.childRepDepConfigs)
      });
    }
    else {
      childs.push({
        value: tree.depCode,
        label: tree.depName
      });
    }
  });
  return childs;
};
const regRule = {
  idCard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
  phone: /^[0-9]{7,}$/,
  idCode: /^[T]\d{14}$/,
  nGInteger: /^\d+$/, // 排序号
  code: /^[0-9a-zA-Z]+$/, // 編号
  isComponent: /^[a-zA-Z]+$/ // 字母
};
/**
 * 去抖动
 * @param {*} fn
 * @param {*} delay
 */
const debounce = (fn, delay) => {
  let timeoutID = null;
  return function later(...args) {
    clearTimeout(timeoutID);
    let that = this;
    timeoutID = setTimeout(() => {
      fn.apply(that, args);
    }, delay);
  };
};

// echart字体大小
const fontSizeEchart = (domId, size) => {
  let clientWidth = document.getElementById(domId).clientWidth;
  if (!clientWidth) return 18;
  let fontSize = clientWidth / 1810;
  return size*fontSize;
}

/**
 * 转义html
 * @param {*} html
 */
const encodeHtml = html => ((html && html.replace) ? (
  html.replace(/&/g, '&amp;') // 转换&符号
    .replace(/ /g, '&nbsp;') // 转换空格
    .replace(/\b&nbsp;+/g, ' ') // 转换多个空格为单个空格
    .replace(/</g, '&lt;') // 转换小于符号
    .replace(/>/g, '&gt;') // 转换大于符号
    .replace(/\\/g, '&#92;') // 转换斜杠符号
    .replace(/\'/g, '&#39;') // 转换单引号
    .replace(/\"/g, '&quot;') // 转换双引号
    .replace(/\n/g, '<br/>') // 转换换行符号
    .replace(/\r/g, '') // 转换回车符号
) : html);

// 去除\N字符
const dealData = datas => {
  if (!datas) {
    return {};
  }
  if (datas.constructor === Array) {
    for (let i = 0; i < datas.length; i++) {
      let item = datas[i];
      for (let key in item) {
        if (item[key] === '\\N') {
          item[key] = '';
        }
      }
    }
  }
  else if (datas.constructor === Object) {
    for (let key in datas) {
      if (datas[key] === '\\N') {
        datas[key] = '无';
      }
    }
  }
  return datas;
};


const getTimeString = (newTime = new Date()) => {
  let Year = newTime.getFullYear();
  let Month = addZero(newTime.getMonth() + 1);
  let Day = addZero(newTime.getDate());

  return `${Year}${Month}${Day}`;
};
const calcuMD5 = pwd => {
  // pwd = pwd.toUpperCase();//小写转大写
  pwd = md5(md5(pwd) + 'hg');
  return pwd;
};
const getToken = () => {
  const storage = storageMode['localStorage'];
  return storage.$get({
    key: 'tokenId'
  });
};
const setToken = ({
  key,
  parameter,
  date,
  reflush,
  url
}) => {
  const storage = storageMode['localStorage'];
  return storage.$set({
    key,
    parameter,
    date,
    reflush,
    url
  });
};

const removeToken = () => {
  const storage = storageMode['localStorage'];
  return storage.$remove({
    key: 'tokenId'
  });
};
const setStorage = ({
  type,
  key,
  parameter,
  date,
  reflush,
  url
}) => {
  const storage = storageMode[type];
  return storage.$set({
    key,
    parameter,
    date,
    reflush,
    url
  });
};
const getStorage = ({
  type,
  key
}) => {
  const storage = storageMode[type];
  return storage.$get({
    key
  });
};
const removeStorage = ({
  type,
  key
}) => {
  const storage = storageMode[type];
  return storage.$remove({
    key
  });
};

// 计算uuid
const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

const getUid = () => (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());

// 生成指定范围数组
const getIntArry = (start, end) => {
  let _length = end - start + 1;
  let step = start - 1;
  let f = length => Array.from({
    length
  }).map((v, k) => k);
  return f(_length)
    .map(() => {
      step++;
      return step;
    });
};

const formatJson = (filterVal, jsonData) => (jsonData.map(v => filterVal.map(j => (v[j] ? String(v[j]) : ''))));

/* eslint global-require: "off" */
/* eslint import/no-dynamic-require: "off" */
const generateExcel = ({
  tHeader,
  list,
  filterVal,
  defaultTitle
}) => {
  require.ensure([], () => {
    const {
      export_json_to_excel
    } = require('@/vendor/Export2Excel');
    const data = formatJson(filterVal, list);
    export_json_to_excel(tHeader, data, defaultTitle);
  });
};


const transJson = d => {
  let code = [];
  let nam = [];
  let arr = [];
  for (let i = 0; i < d.length; i++) {
    if (i === 0) {
      code.push(d[0].depCode);
      nam.push(d[0].depName);
      let ob = {
        jqzs: d[0].jqzs,
        yxjq: d[0].yxjq,
        date: d[0].date
      };
      let obj = {
        depCode: d[0].depCode,
        depName: d[0].depName,
        data: []
      };
      obj['data'].push(ob);
      arr.push(obj);
    }
    else if (code.indexOf(d[i].depCode) === -1) {
      code.push(d[i].depCode);
      nam.push(d[i].depName);
      let ob = {
        jqzs: d[i].jqzs,
        yxjq: d[i].yxjq,
        date: d[i].date
      };
      let obj = {
        depCode: d[i].depCode,
        depName: d[i].depName,
        data: []
      };
      obj['data'].push(ob);
      arr.push(obj);
    }
    else {
      let idx = code.indexOf(d[i].depCode);
      let ob = {
        jqzs: d[i].jqzs,
        yxjq: d[i].yxjq,
        date: d[i].date
      };
      arr[idx]['data'].push(ob);
    }
  }
  return arr;
};
const transClassJson = d => {
  // console.log('%%$$$###开始', d);
//   {
//     "date": "2015-01-18",
//     "jqzs": 3,
//     "lbdm": "10",
//     "name": "刑事案件1",
//     "data": [18,19,20,21,22,23]
// },
  if (d.length > 0) {
    let code = [];
    let nam = [];
    let arr = [];
    for (let i = 0; i < d.length; i++) {
      if (i === 0) {
        code.push(d[0].lbdm);
        nam.push(d[0].lbmz);
        let ob = {
          jqzs: d[0].jqzs,
          date: d[0].date
        };
        let obj = {
          lbdm: d[0].lbdm,
          lbmz: d[0].lbmz,
          data: []
        };
        obj['data'].push(ob);
        arr.push(obj);
      }
      else if (code.indexOf(d[i].lbdm) === -1) {
        code.push(d[i].lbdm);
        nam.push(d[i].lbmz);
        let ob = {
          jqzs: d[i].jqzs,
          date: d[i].date
        };
        let obj = {
          lbdm: d[i].lbdm,
          lbmz: d[i].lbmz,
          data: []
        };
        obj['data'].push(ob);
        arr.push(obj);
      }
      else if (code.indexOf(d[i].lbdm) !== -1) {
        let idx = code.indexOf(d[i].lbdm);
        let ob = {
          jqzs: d[i].jqzs,
          date: d[i].date
        };
        arr[idx]['data'].push(ob);
      }
    }
    // console.log('%%$$$###结果', arr);
    return arr;
  }
};
/**
 * 返回机构代码level
 * @param {*} depCode  机构代码
 */
const depCodeLevel = depCode => {

  // 省
  if (depCode.substring(2, 12) === '0000000000') {
    return 2;
  }
  // 市
  if (depCode.substring(4, 12) === '00000000') {
    return 4;
  }
  // 县区
  if (depCode.substring(6, 12) === '000000') {
    return 6;
  }
  // 街道
  if (depCode.substring(8, 12) === '0000') {
    return 8;
  }
  // 社区
  return 10;
};
/**
 * 获取机构代码与用户机构之间的子机构代码数组
 * @param {*} ucode 用户机构代码
 * @param {*} depCode 机构代码
 * @param {*} arry 数组
 */
const getDepCodeArryWithUser = (ucode, depCode, arry = [], root = false) => {
  const uLevel = depCodeLevel(ucode);
  const targetLevel = depCodeLevel(depCode);
  arry.unshift(depCode);
  let num = root ? 0 : 2;
  // console.log(num);
  // 用户自身不要+2
  if (targetLevel > (uLevel + num)) {
    let depCode2 = depCode.substring(0, targetLevel - 2).padEnd(12, '0');
    getDepCodeArryWithUser(ucode, depCode2, arry, root);
  }
  else {
    return arry;
  }


};
const parseArra = data => {
  let result = {
    map: {},
    x: [],
    len: [],
    series: []
  };
  /**
   * 遍历出x轴 array 和legend array
   */
  // eslint-disable-next-line guard-for-in
  for (let xVal in data) {
    result.x.push(xVal);
    let lenObj = data[xVal];
    for (let lenVal in lenObj) {
      if (!result.len.includes(lenVal)) {
        result.len.push(lenVal);
      }
    }
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
};

const deepCopy = data => {
  let copyed_objs = [];// 此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
  function _deepCopy(target) {
    if ((typeof target !== 'object') || !target) { return target; }
    for (let i = 0; i < copyed_objs.length; i++) {
      if (copyed_objs[i].target === target) {
        return copyed_objs[i].copyTarget;
      }
    }
    let obj = {};
    if (Array.isArray(target)) {
      obj = [];// 处理target是数组的情况
    }
    copyed_objs.push({ target, copyTarget: obj });
    Object.keys(target).forEach(key => {
      if (obj[key]) { return; }
      obj[key] = _deepCopy(target[key]);
    });
    return obj;
  }
  return _deepCopy(data);
};

// 只判断一层
const targetIsChange = (target, data) => {
  if (typeof (target) === 'string') {
    return target === data;
  }
  if (typeof (target) === 'object') {
    let bool = false;
    for (let key in target) {
      if (target[key] !== data[key]) {
        bool = true;
        break;
      }
    }

    return bool;
  }
};

// 将表格数据转化为Excel
const transExcel = (list, tHeader, filterVal, fileName) => {

  const data = list.map(v => filterVal.map(j => v[j])); // 将数据对象数据转化为一个个数组
  // console.log('data-----------------------------------', data);
  let ws = XLSX.utils.aoa_to_sheet([
    tHeader,
    ...data
  ]);
  // let ws = XLSX.utils.table_to_sheet(document.getElementById('table1'));
  /* generate workbook and add the worksheet */
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  /* save to file */
  XLSX.writeFile(wb, fileName);
};

const group = (array, subGroupLength) => {
  let index = 0;
  let newArray = [];
  while(index < array.length) {
      newArray.push(array.slice(index, index += subGroupLength));
  }
  return newArray;
}

export default {
  getUid,
  getTime,
  getTimeALL,
  getTime2,
  parseTimeNumber,
  transforTree,
  getTimeToMonth,
  getTimeToDay,
  getTimeByMonth,
  regRule,
  debounce,
  encodeHtml,
  dealData,
  getTimeString,
  calcuMD5,
  setToken,
  getToken,
  removeToken,
  setStorage,
  getStorage,
  removeStorage,
  getTimeByDay,
  crypto,
  getIntArry,
  generateExcel,
  transJson,
  transClassJson,
  depCodeLevel,
  getDepCodeArryWithUser,
  parseArra,
  deepCopy,
  targetIsChange,
  transExcel,
  group,
  fontSizeEchart,
  toExport
};
