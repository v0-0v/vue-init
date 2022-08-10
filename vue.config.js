const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  assetsDir: './',
  outputDir: 'dist/dist',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.170.23.226:18443', // ceshi
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  chainWebpack: config => {
    config.externals({ // 将需要忽略打包的都写在这个里面，但前提是index.html文件里面必须script引入
      httpConfig: 'httpConfig',
      jquery: 'window.jQuery'
    });
    config.devServer.set('disableHostCheck', true); // 是否关闭用于DNS重绑定的HTTP请求的host检查,通常用于搭配 --host 0.0.0.0 使用，因为你想要其它设备访问你本地的服务，但访问时是直接通过 IP 地址访问而不是 HOST 访问，所以需要关闭 HOST 检查
    config.resolve.extensions // 引入组件可以省略的文件后缀名
      .add('.vue')
      .add('.scss');
    config.resolve.alias // 设置别名
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'));
  },
  pwa: {},
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true; // 清除线上console
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
