module.exports = {
    publicPath: process.env.NODE_ENV === 'production'? "/": "/",
    outputDir: "dist",
    assetsDir: "static",
    productionSourceMap: false,
    devServer: {
      proxy: {
        '/api': {
          target: 'http://192.168.33.185/',
          changeOrigin: true,
          pathRewrite: {
            '^/': ''
          }
        }
      }
    }
  }