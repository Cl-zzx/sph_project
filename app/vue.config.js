module.exports = {
  // 关闭eslint
  lintOnSave: false,
  productionSourceMap: false,
  // 代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      },
    },
  },
};
