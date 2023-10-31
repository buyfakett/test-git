const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  assetsDir: "static",
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.112:8002/api',
        // target: 'http://127.0.0.1:8000/api',
        // target: 'https://rsspush.nmg.buyfakett.top/api',
        changeOrigin: true,
        pathRewrite: {'^/api': ''},
      }
    }
  }
})
