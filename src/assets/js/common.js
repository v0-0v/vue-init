const ISO8601_DATE_REGEX = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
/* 时间戳转换函数 */
// eslint-disable-next-line import/no-mutable-exports
let renderTime = (value = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
  // console.log(value);
  const date = toDate(value);

  if (!date) {
    return '';
  }

  // console.log(date);
  return format
    .replace('YYYY', `${date.getFullYear()}`)
    .replace('YY', `${date.getFullYear() % 100}`)
    .replace('MM', `${date.getMonth() + 1}`.padStart(2, '0'))
    .replace('M', `${date.getMonth() + 1}`)
    .replace('DD', `${date.getDate()}`.padStart(2, '0'))
    .replace('D', `${date.getDate()}`)
    .replace('HH', `${date.getHours()}`.padStart(2, '0'))
    .replace('H', `${date.getHours()}`)
    .replace('hh', `${date.getHours() % 12}`.padStart(2, '0'))
    .replace('h', `${date.getHours() % 12}`)
    .replace('mm', `${date.getMinutes()}`.padStart(2, '0'))
    .replace('m', `${date.getMinutes()}`)
    .replace('ss', `${date.getSeconds()}`.padStart(2, '0'))
    .replace('s', `${date.getSeconds()}`)
    .replace('SSS', `${date.getMilliseconds()}`.padStart(3, '0'))
    .replace('SS', `${date.getMilliseconds()}`.padStart(2, '0'))
    .replace('S', `${date.getMilliseconds()}`)
    // Always last
    .replace('A', date.getHours() < 12 ? 'AM' : 'PM')
    .replace('a', date.getHours() < 12 ? 'am' : 'pm');
};
function toDate(value) {
  // Date 类型
  if (isDate(value)) {
    return value;
  }
  // Number 类型
  if (typeof value === 'number' && !isNaN(value)) {
    return new Date(value);
  }
  // String 类型
  if (typeof value === 'string') {
    value = value.trim();
    // 空字符串
    if (value === '') {
      return null;
    }

    const parsedNb = parseFloat(value);

    // any string that only contains numbers, like "1234" but not like "1234hello"
    if (!isNaN(value)) {
      if (/^(\d{14})$/.test(value)) {
        let Year = value.slice(0, 4);
        let Month = value.slice(4, 6);
        let Day = value.slice(6, 8);
        let Hour = value.slice(8, 10);
        let Minute = value.slice(10, 12);
        let Second = value.slice(12, 14);
        return new Date(Year, Month - 1, Day, Hour, Minute, Second);
      }
      return new Date(parsedNb);
    }
    // 2019-1-9
    if (/^(\d{4}-\d{1,2}-\d{1,2})$/.test(value)) {
      const [y, m, d] = value.split('-')
        .map(val => +val);
      return new Date(y, m - 1, d);
    }
    // 2019-1-19 10:10:10
    if (/^(\d{4}-\d{1,2}-\d{1,2}\s+\d{1,2}:\d{1,2}:\d{1,2})$/.test(value)) {
      let [front, end] = value.split(' ');
      const [y, M, d] = front.split('-')
        .map(val => +val);
      const [h, m, s] = end.split(':')
        .map(val => +val);
      return new Date(y, M - 1, d, h, m, s);
    }

    // ISO8601_DATE_REGEX
    let match;
    if (match = value.match(ISO8601_DATE_REGEX)) {
      return isoStringToDate(match);
    }
  }
  function isDate(date) {
    return date instanceof Date && !isNaN(date.valueOf());
  }

  const date = new Date(value);
  if (!isDate(date)) {
    console.warn(`Unable to convert "${value}" into a date`);
    return null;
    // throw new Error(`Unable to convert "${value}" into a date`);
  }
  return date;
}
function isoStringToDate(match) {
  const date = new Date(0);
  let tzHour = 0;
  let tzMin = 0;

  // match[8] means that the string contains "Z" (UTC) or a timezone like "+01:00" or "+0100"
  const dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear;
  const timeSetter = match[8] ? date.setUTCHours : date.setHours;

  // if there is a timezone defined like "+01:00" or "+0100"
  if (match[9]) {
    tzHour = Number(match[9] + match[10]);
    tzMin = Number(match[9] + match[11]);
  }
  dateSetter.call(date, Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  const h = Number(match[4] || 0) - tzHour;
  const m = Number(match[5] || 0) - tzMin;
  const s = Number(match[6] || 0);
  const ms = Math.round(parseFloat('0.' + (match[7] || 0)) * 1000);
  timeSetter.call(date, h, m, s, ms);
  return date;
}
/* ajax请求 */
// eslint-disable-next-line import/no-mutable-exports
let ajax = function(that, url, params, success, method) {
  if (method === 'GET') {
    that.$axios({
      method: 'get',
      url,
      params
    }).then(response => {
      if (response.data.msg === 'OK') {
        success(response.data.bean);
      }
      else {
        console.log(response.data.msg);
      }
    }).catch(response => {
      console.log(response);
    });
  }
  else {
    params = that.querystring.stringify(params);
    that.$axios({
      method: 'POST',
      url,
      data: params
    }).then(response => {
      if (response.data.msg === 'OK') {
        success(response.data.bean);
      }
      else {
        console.log(response.data.msg);
      }
    }).catch(response => {
      console.log(response);
    });
  }
};
// eslint-disable-next-line import/no-mutable-exports
let getCurrentMonthFirstDay = function() {
  let date = new Date();
  date.setDate(1);
  // var month = parseInt(date.getMonth() + 1)
  // var month = parseInt(date.getMonth())
  let month = '4';
  let day = date.getDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  return date.getFullYear() + '-' + month + '-' + day + ' 00:00:00';
};

export {
  renderTime,
  ajax,
  getCurrentMonthFirstDay
};
