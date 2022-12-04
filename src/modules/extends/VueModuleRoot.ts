import { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  createDefine,
  createInstance,
  DefineType,
  ModuleRoot
} from "moduse";
import { createHook } from "vue-moduse";

type IConfig = { requestConfig?: AxiosRequestConfig } & { [name: string]: any };
type IActions = DefineType<(...args: any) => any>;
type IHttps = DefineType<(...args: any) => Promise<AxiosResponse<any, any>>>;

export class VueModuleRoot extends ModuleRoot {
  static create = createInstance<"config" | "actions" | "https">();
  static hook<T extends typeof ModuleRoot, S extends Capitalize<string>>(
    this: T,
    name: S
  ) {
    return createHook(this, name);
  }
  // 通过createDefine方法, 为模块添加自定义的定义方法，通过泛型限定该定义的内容
  static defineConfig = createDefine<IConfig>();
  static defineAction = createDefine<IActions>();
  static defineHttp = createDefine<IHttps>();

  config?: IConfig;
  actions?: IActions;
  https?: IHttps;

  // 通过this.createUse方法，为模块添加自定义的配置方法，默认绑定createOptionsKey,
  useConfig = this.createUse("config");
  useHttps = this.createUse("https");
  // 配置第二个参数options的handle字段, 可添加一些默认逻辑
  useActions = this.createUse("actions", {
    handle: ([key, value]) => {
      return (...args: any) => {
        console.log("action:", key, ...args);
        value.call(this, ...args);
      };
    },
  });
}
