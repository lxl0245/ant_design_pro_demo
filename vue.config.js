module.exports = {
  // 选项
  css: {
    loaderOptions: {
      // css: {
      //     // 这里的选项会传递给 css-loader
      // },
      less: {
        // 这里的选项会传递给 less-loader
        javascriptEnabled: true
      }
      // postcss: {
      //   // 这里的选项会传递给 postcss-loader
      // },
      // sass: {
      //     // 这里的选项会传递给 sass-loader
      // },
      // stylus: {
      //     // 这里的选项会传递给 stylus-loader
      // },
    }
  },
  // 把后端API的请求，代理到Mock文件中
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.0.100:8080/",
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else {
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            console.log(`./mock/${name}`);
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            // 清除缓存
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
}