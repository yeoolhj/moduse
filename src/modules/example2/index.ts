import axios from "axios";
import { ModuleRoot } from "moduse";
import { reactive } from "vue";
import { infoAction } from "./actions/info";
import { logsAction } from "./actions/logs";
import { https } from "./https";

export type InfoType = typeof defaultInfo;

const defaultInfo = {
  name: "example2",
  description: "this is single example2",
};

export class ExampleModule extends ModuleRoot {
  state = reactive({
    info: { ...defaultInfo },
    logs: [] as string[],
  });

  request = axios.create({ baseURL: "http://localhost:8000/api" });

  // 配置操作模块数据的业务逻辑infoAction和logsAction
  // 支持传入解构对象或者数组, vue中由于ts支持问题建议使用解构对象
  actions = this.use({ ...infoAction, ...logsAction });

  // 配置https
  https = this.use(https);
}
