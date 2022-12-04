const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  chainWebpack: (config) => {
    const tsRule = config.module.rule("ts");
    tsRule
      .use("moduse-loader")
      .loader("./packages/moduse/webpack-loader")
      .options({
        abstractModule: "ModuleRoot|MyModuleRoot|VueModuleRoot",
        include: [path.resolve(__dirname, "./src/modules")],
      })
      .before("ts-loader");
  },
});
