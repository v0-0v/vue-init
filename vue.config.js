const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  baseUrl: './',
  assetsDir: './',
  outputDir: 'dist/dist',
  devServer: {
    proxy: {
      '/api': {
        // target: 'https://192.168.14.188:8443',
        // target: 'https://47.97.214.92:8443', // 线上
        // target: 'http://192.170.15.45:8443', // 刘冠业本地
        // target: 'https://192.170.23.224:8443', // 中间大屏内网后端接口地址
        // target:'http://127.0.0.1:18443',
        // target: 'http://115.236.164.82:18443',
        target: 'http://192.170.23.226:18443', // ceshi
        // target: 'http://192.170.15.93:18443', // 本地

        // target: 'https://192.170.40.212:8443', // 焦自然公司
        // target: 'https://192.168.43.15:8443', // 焦自然省厅外网
        // target: 'https://10.118.58.143:8443', // 焦自然省厅内网
        // target: 'http://win.ngrok.xiaomiqiu.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  lintOnSave: false,
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  productionSourceMap: false,
  chainWebpack: config => {
    config.externals({
      httpConfig: 'httpConfig',
      jquery: 'window.jQuery',
      BMap: 'BMap',
      AMap: 'AMap',
      AMapUI: 'AMapUI'
    });
    config.devServer.set('disableHostCheck', true);
    config.resolve.extensions.add('.vue')
      .add('.scss');
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'));
  },
  pwa: {
    iconPath: {
      favicon32: './zflogo.png',
      favicon16: './zflogo.png',
      appleTouchIcon: './zflogo.png',
      maskIcon: './zflogo.png',
      msTileImage: './zflogo.png'
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
    config.entry.app = ['babel-polyfill', './src/main.js'];
  }
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     $: 'jquery',
  //     jQuery: 'jquery',
  //     'windows.jQuery': 'jquery'
  //   })
  // ]
};
