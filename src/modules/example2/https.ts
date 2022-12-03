import { ExampleModule } from ".";

// 通过模块的define方法定义模块相关业务逻辑，this指该向该模块实例
export const https = ExampleModule.define({
  getInfo() {
    return this.request.get("/getInfo");
  },
});
