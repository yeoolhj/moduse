import axios from "axios";
import { ModuleRoot } from "moduse";
import { reactive } from "vue";

const defaultInfo = {
  name: "example1",
  description: "this is single example",
};

export class ExampleModule extends ModuleRoot {
  // 配置一个双向绑定的数据模型，该示例使用基于vue3的reactive
  state = reactive({
    info: { ...defaultInfo },
  });

  // 配置一个请求实例
  request = axios.create({ baseURL: "http://localhost:8000/api" });

  // 配置操作模块数据的业务逻辑
  actions = this.use({
    async initInfo() {
      const res = await this.https.getInfo();
      if (res.status === 200) {
        this.state.info = res.data;
      }
    },
    async updateInfo(info: typeof defaultInfo) {
      this.state.info = info;
    },
  });

  // 配置获取/设置该模块数据的请求接口
  https = this.use({
    getInfo() {
      return this.request.get("/getInfo");
    },
  });
}
