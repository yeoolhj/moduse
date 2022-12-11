import axios from "axios";
import { createInstance, ModuleRoot } from "moduse";
import { reactive } from "vue";
import { infoAction } from "./actions/info";
import { logsAction } from "./actions/logs";
import { https } from "./https";

export type InfoType = typeof defaultInfo;

const defaultInfo = {
  name: "example",
  description: "this is single example",
};

export class ExampleModule extends ModuleRoot {
  // ExampleModule.create覆盖ModuleRoot.create, 通过泛型配置调用create方法时可以传入的options字段
  // 在初始化时，可重写配置了createOptionsKey的模块定义的内容
  static create = createInstance<"actions" | "https">();

  state = reactive({
    info: { ...defaultInfo },
    logs: [] as string[],
  });

  request = axios.create({ baseURL: "http://localhost:8000/api" });

  // 配置第二个参数options的createOptionsKey字段, 让actions可配置
  actions = this.use([infoAction, logsAction], {
    createOptionsKey: "actions",
  });

  // 通过配置第二个参数options的createOptionsKey字段, 让https可配置
  https = this.use(https, { createOptionsKey: "https" });
}
