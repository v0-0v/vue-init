/** 2018/12/22
 *作者: Cookie
 *功能: 格式化金钱跟数字千分位
 */
const fmoney = (s, n) => {
  n = n > 0 && n <= 17 ? n : 2;
  if (!s || s === 0) {
    return '0.00';
  }
  s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + '';
  let l = s.split('.')[0].split('').reverse();
  let r = s.split('.')[1];
  let t = '';
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
  }
  return t.split('').reverse().join('') + '.' + r;
};

const fnum = n => {
  if (!n) {
    return 0;
  }
  let str_n = n.toString();
  let result = '';
  while (str_n.length > 3) {
    result = ',' + str_n.slice(-3) + result;
    str_n = str_n.slice(0, str_n.length - 3);
  }
  if (str_n) {
    return `${str_n}${result}`;
  }
  return 0;
};

export {
  fmoney,
  fnum
};
