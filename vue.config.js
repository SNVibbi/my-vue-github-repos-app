const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    host: '0.0.0.0', 
    port: 8080,
    allowedHosts: 'all', 
    proxy: {
      '/api': {
        target: 'https://api.github.com', 
        changeOrigin: true, 
        pathRewrite: { '^/api': '' } 
      }
    }
  }
});
