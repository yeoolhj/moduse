import { ExampleModule, InfoType } from "..";

// 通过模块的define方法定义模块相关业务逻辑，this指该向该模块实例
export const infoAction = ExampleModule.define({
  async initInfo() {
    const res = await this.https.getInfo();
    if (res.status === 200) {
      this.state.info = res.data;
    }
  },
  async updateInfo(info: InfoType) {
    this.state.info = info;
  },
});
