import { ExampleModule, InfoType } from "..";

export const infoAction = ExampleModule.define({
  async initInfo() {
    const res = await this.https.getInfo();
    if (res.status === 200) {
      this.state.info = res.data;
    }
  },
  async updateInfo(info: InfoType) {
    const res = await this.https.updateInfo(info);
    if (res.status === 200) {
      this.state.info = info;
    }
  },
});
