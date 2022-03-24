const path = require('path');
const webpack = require('webpack');
const Timestamp = new Date().getTime();

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "https:d39z8cow1w35u4.cloudfront.net/amazonvt1/web/" : "/",
  devServer: {
    port: 2080,
    proxy: {
      '/api': {
        target: 'https://9sua10vc29.execute-api.ap-southeast-1.amazonaws.com/data',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api': ''
        },
      },
    }
  },
  configureWebpack: {
    // Set up all the aliases we use in our app.
    output: {
      filename: `js/[name].${Timestamp}.js`,
      chunkFilename: `js/[name].${Timestamp}.js`
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      }),
    ]
  },
  // css: {
  //   // Enable CSS source maps.
  //   sourceMap: process.env.NODE_ENV !== 'production',
  //   loaderOptions: {
  //     sass: {
  //       prependData: `
  //         @import "~@/style/global.scss";
  //       `
  //     },
  //     less: {
  //       javascriptEnabled: true,
  //       modifyVars: {
  //         // 'notify-primary-background-color':'red',
  //         // 'hack':`true;@import "${resolve('./src/style/mine_vant.less')}";`
  //       }
  //     }
  //   }
  // },
}
