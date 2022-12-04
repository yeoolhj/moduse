import axios from "axios";
import { reactive } from "vue";
import { VueModuleRoot } from "../extends/VueModuleRoot";
import { infoAction } from "./actions/info";
import { logsAction } from "./actions/logs";
import { config } from "./config";
import { https } from "./https";

export type InfoType = { name: string; description: string };

export class ExampleModule extends VueModuleRoot {
  // 通过自定义的suseConfig方法配置config
  config = this.useConfig(config);

  state = reactive({
    // 基于config配置初始化info
    info: { ...this.config.defaultInfo },
    logs: [] as string[],
  });

  // 基于config配置实例化axios
  request = axios.create(this.config.requestConfig);

  // 通过自定义的useActions方法配置actions
  actions = this.useActions({ ...infoAction, ...logsAction });

  // 通过自定义的useHttps方法配置https
  https = this.useHttps(https);
}

export const { useExample, initExample, setExampleOptions } =
  ExampleModule.hook("Example");
