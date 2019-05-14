// Explanation of each configuration item You can find it in https://cli.vuejs.org/config/

const path = require('path');

function resolve(dir) {
  return path.join(__dirname, './', dir);
}

console.log(process.env.npm_config_env);
const isOnline = process.env.npm_config_env === 'online';

function getBaseUrl() {
  return isOnline ? '//static.qipeipu.com/btr_xx_static/' : '/';
}


module.exports = {
  /**
   * You can set by yourself according to actual condition
   * You will need to set this if you plan to deploy your site under a sub path,
   * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then assetsPublicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail https://cli.vuejs.org/config/#baseurl
   */
  baseUrl: getBaseUrl(),
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 9528,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      // '/': {
      //   target: 'http://192.168.16.33:8081',
      //   // target: 'http://192.168.16.100:9004',
      //   // target: 'http://192.168.16.180:9003',
      //   // target: 'http://192.168.16.180:9003',
      //   // target: 'http://192.168.16.63:9003', // 贵鹏
      //   // target: 'http://192.168.16.33:9003', //庚川
      //   changeOrigin: true,
      // },
      '/': {
        target: 'https://www.easy-mock.com/mock/5cd0e27cd61cdd209810969d/example',
        // target: 'http://172.16.19.152:8080',
        // target: 'http://192.168.16.100:9004',
        // target: 'http://192.168.16.180:9003',
        // target: 'http://192.168.16.180:9003',
        // target: 'http://192.168.16.63:9003', // 贵鹏
        // target: 'http://192.168.16.33:9003', //庚川
        changeOrigin: true,
      },
    },
  },

  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: '天戟ERP开放平台',
    resolve: {
      alias: {
        '@': resolve('src'),
        Utils: resolve('src/utils'),
        Mixins: resolve('src/mixins'),
        Api: resolve('src/api'),
      },
    },
  },
  chainWebpack: config => {
    const cdn = {
      // inject tinymce into index.html
      // why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
      js: ['https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.2/tinymce.min.js'],
    };
    config.plugin('html')
      .tap(args => {
        args[0].cdn = cdn;
        return args;
      });
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map'));

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/,
            }]);
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial', // 只打包初始时依赖的第三方
                },
                elementUI: {
                  name: 'chunk-elementUI', // 单独将 elementUI 拆包
                  priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                  test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                },
              },
            });
          config.optimization.runtimeChunk('single');
        });

    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [resolve('src/styles/variables.scss')],
        })
        .end();
    });

    config.plugin('copy').tap(options => {
      const pluginOptions = options[0];
      pluginOptions[0].to = path.resolve(__dirname, './dist/static');
      return options;
    });
  },
};
