module.exports = {
  // presets: ["@vue/cli-plugin-babel/preset"],
  presets: ["@vue/app"],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
};
