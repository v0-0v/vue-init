/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */

const routerMode = 'history';
const baseImgPath = '';

const isDevelopment = process.env.NODE_ENV === 'development';

const serverName = isDevelopment ? '/' : '';

const serverPath = isDevelopment ? '' : '';

const baseUrl = serverName + serverPath;

export {
  baseUrl,
  routerMode,
  baseImgPath,
  isDevelopment
};
