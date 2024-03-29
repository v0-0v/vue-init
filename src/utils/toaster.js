/** 2019/1/7
 *作者:lzq
 *功能: 提示
 */

import Vue from 'vue';

export default {
  message(m, t, d, data, cb) {
    let options = {
      customClass: 'toaster toaster-success',
      title: t || '成功',
      message: m || '操作成功',
      duration: d || 1500,
      type: 'success',
      onClick: cb
    };
    Vue.prototype.$message.success(options);
  },
  error(m, t, d) {
    let options = {
      title: t || '错误',
      message: `${t}  ${m || ''}` || '错误消息',
      duration: d || 1500,
      offset: 120,
      type: 'error',
      showClose: true
    };
    Vue.prototype.$message.error(options);
  },
  info(m, t, d) {
    let options = {
      title: t || '操作提示',
      message: `${t}  ${m || ''}` || '提示消息',
      duration: d || 1500,
      type: 'info',
      showClose: true
    };
    Vue.prototype.$message.info(options);
  },
  warn(m, t, d) {
    let options = {
      customClass: 'toaster toaster-warn',
      title: t || '警告',
      message: m || '警告消息',
      duration: d || 1500,
      type: 'warning',
      showClose: true
    };
    Vue.prototype.$message.warning(options);
  },
  ok(m, t, d) {
    let options = {
      title: t || '成功',
      message: m || '操作成功',
      duration: d || 1500,
      type: 'success',
      showClose: true
    };
    Vue.prototype.$message.success(options);
  }
};
