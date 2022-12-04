import { ExampleModule, InfoType } from ".";

export const https = ExampleModule.defineHttp({
  getInfo() {
    return this.request.get("/getInfo");
  },
  updateInfo(info: InfoType) {
    return this.request.post("/updateInfo", info);
  },
});
